using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Hubs;
using Game.Hubs.Services.Store;
using Game.Model;
using Game.Services.Stores;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace Game.Services.Model
{
    public class GameBuilder
    {
        public Guid GameId { get; set; }

        private readonly IConnectionManager _manager;
        private readonly GamesStore _gameStore;
        public List<Player> Players { get; set; } = new List<Player>();

        private readonly object _lockObject = new Object();

        public GameBuilder(IConnectionManager manager, GamesStore gameStore)
        {
            GameId = new Guid();
            _manager = manager;
            _gameStore = gameStore;
        }

        public void Connect(User user)
        {
            lock (_lockObject)
            {
                if (CheckUniquePlayer(user)) return;

                foreach (var p in Players)
                {
                    p.Lobby.PlayerConnected(user);
                }

                AddPlayer(user);

                if (IsFull())
                {
                    ShuffleCards();
                    StartGame();

                    foreach (var p in Players)
                    {
                        p.Lobby.GameStart(Players.Select(k => k.Info).ToArray(), p.Money, p.Cards, p.AvailableCards);
                    }
                }
            }
        }

        private void AddPlayer(User user)
        {
            var player = new Player(user,
                 _manager.GetHubContext<GameService, IGameContext>().Clients.Client(user.ConnectionId),
                 _manager.GetHubContext<LobbyServices, ILobbyContext>().Clients.Client(user.ConnectionId)
                );

            player.Lobby.Connected(GameId, Players.Select(k => k.Info).ToArray());

            Players.Add(player);
        }

        private bool CheckUniquePlayer(User user)
        {
            return Players.Any(a => a?.Info == user);
        }

        private void StartGame()
        {
            _gameStore.Create(Players.ToArray(), GameId);
        }

        public bool IsFull()
        {
            return Players.Count == 3;
        }

        private void ShuffleCards()
        {
            var rnd = new Random();
            var cards = from suit in Enumerable.Range(0, 4)
                        from index in Enumerable.Range(6, 9)
                        select new Card() { Suit = suit, Index = index };

            var group = cards.ToArray().OrderBy(a => rnd.NextDouble()).ToArray().Select((c, i) => new { c, i }).GroupBy(a => a.i / 12);


            foreach (var g in group)
            {
                Players[g.Key].Cards = g.ToArray().OrderBy(a => a.c.Suit).ThenBy(a => a.c.Index).Select(a => a.c).ToArray();
            }
        }
    }
}
