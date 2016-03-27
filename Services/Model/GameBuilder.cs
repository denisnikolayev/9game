using System;
using System.Collections.Generic;
using System.Linq;
using Game.Model;
using Game.Services.Stores;
using Game.Model.Players;

namespace Game.Services.Model
{
    public class GameBuilder
    {
        public Guid GameId { get; set; }
        
        private readonly GamesCache _gameStore;
        

        public List<Player> Players { get; set; } = new List<Player>();

        private readonly object _lockObject = new Object();

        public GameBuilder(GamesCache gameStore)
        {
            GameId = Guid.NewGuid();           
            _gameStore = gameStore;
        }

        public void Connect(Player player)
        {
            lock (_lockObject)
            {
                if (!CheckUniquePlayer(player)) return;

                foreach (var p in Players)
                {
                    p.Lobby.PlayerConnected(player.User);
                }

                AddPlayer(player);

                if (IsFull())
                {
                    ShuffleCards();
                    var game = StartGame();

                    foreach (var p in Players)
                    {
                        p.Lobby.GameStart(Players.Select(k => k.User).ToArray(), 150, p.Cards, p.AvailableCards);
                    }
                    
                    if (!game.CurrentPlayer.IsHuman)
                    {
                        game.PutCardOnTheTable(game.CurrentPlayer, null);
                    }
                }
            }
        }


        public void AddComputer(Player players)
        {
            lock (_lockObject)
            {
                if (!IsFull()) { 
                    Connect(players);
                }
            }
        }

        private void AddPlayer(Player player)
        {            
            player.Lobby.Connected(GameId, Players.Select(k => k.User).ToArray());
            Players.Add(player);
        }
       

        private bool CheckUniquePlayer(Player player)
        {
            return !Players.Contains(player);
        }

        private GameContext StartGame()
        {
            return _gameStore.Create(Players.ToArray(), GameId);
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
