using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Hubs;
using Game.Services;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace Game.Model
{
    public class GameContext
    {
        private readonly IConnectionManager _manager;
        public Guid Id { get; set; }
        public bool[][] Table { get; set; }
        public Player[] Players { get; set; } = new Player[3];
        public int BankMoney { get; set; }
        public int CurrentPlayer {get; set;} = 0;


        public GameContext(IConnectionManager manager) {
            _manager = manager;

            Id = Guid.NewGuid();
            Table = Enumerable.Range(0, 4).Select(suit => Enumerable.Range(0, 15).Select(a => false).ToArray()).ToArray();
        }

        public void ShuffleCards()
        {
            var rnd = new Random();
            var cards = from suit in Enumerable.Range(0, 4)
                        from index in Enumerable.Range(6, 9)                        
                        select new Card() { Suit = suit, Index = index };

            var group = cards.ToArray().OrderBy(a=>rnd.NextDouble()).ToArray().Select((c, i) => new { c, i }).GroupBy(a => a.i / 12);
          

            foreach (var g in group)
            {
                Players[g.Key].Cards = g.ToArray().OrderBy(a => a.c.Suit).ThenBy(a => a.c.Index).Select(a => a.c).ToArray();  
            }
        }

        public void AddPlayer(PlayerInfo user)
        {
            var player = new Player(user,
                 _manager.GetHubContext<GameHub, IGameContext>().Clients.Client(user.ConnectionId),
                 _manager.GetHubContext<LobbyServices, ILobbyContext>().Clients.Client(user.ConnectionId)
                );

            player.Lobby.Connected(Id, GetPlayers().Select(k => k.Info).ToArray());

            Players[CurrentPlayer++] = player;
        }

        public bool CheckUniquePlayer(PlayerInfo user)
        {
            return GetPlayers().Any(a => a?.Info == user);
        }

        public void Start()
        {
            ShuffleCards();
            var player = Players.First(a => a.Cards.Any(b => b.Suit == 3 && b.Index == 9));
            CurrentPlayer = Array.IndexOf(Players, player);
            Players[CurrentPlayer].AvailableCards = new[] {new Card {Suit = 3, Index = 9}};
        }

        public bool isFull()
        {
            return Players.All(a => a != null);
        }

        public Player[] GetPlayers()
        { 
            return Players.Where(p => p != null).ToArray();
        }

        public string[] GetPlayersConnectionId()
        {
            return GetPlayers().Select(p => p.ConnectionId).ToArray();
        }

        public void Connect(PlayerInfo user)
        {
            if (CheckUniquePlayer(user)) return;

            foreach (var p in GetPlayers())
            {
                p.Lobby.PlayerConnected(user);
            }

            AddPlayer(user);

            if (isFull())
            {
                Start();

                foreach (var p in Players)
                {
                    p.Lobby.GameStart(GetPlayers().Select(k=>k.Info).ToArray(), p.Money, p.Cards, p.AvailableCards);
                }
            }
        }
    }
}
