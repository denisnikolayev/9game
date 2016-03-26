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

        Func<User, Player> _playerResolver;
        private readonly GamesStore _gameStore;
        

        public List<Player> Players { get; set; } = new List<Player>();

        private readonly object _lockObject = new Object();

        public GameBuilder(Func<User, Player> playerResolver, GamesStore gameStore)
        {
            GameId = Guid.NewGuid();
            _playerResolver = playerResolver;
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
                    var game = StartGame();

                    foreach (var p in Players)
                    {
                        p.Lobby.GameStart(Players.Select(k => k.User).ToArray(), p.Money, p.Cards, p.AvailableCards);
                    }
                    
                    if (!game.CurrentPlayer.IsHuman)
                    {
                        game.PutCardOnTheTable(game.CurrentPlayer, null);
                    }
                }
            }
        }

        private void AddPlayer(User user)
        {
            var player = _playerResolver(user);
            player.Lobby.Connected(GameId, Players.Select(k => k.User).ToArray());
            Players.Add(player);
        }
       

        private bool CheckUniquePlayer(User user)
        {
            return Players.Any(a => a?.User == user);
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
