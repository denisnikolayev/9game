using System;
using System.Collections.Concurrent;
using System.Linq;
using Game.Model;
using Game.Services.Model;
using Game.Services.Stores;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace Game.Hubs.Services.Store
{
    public class GameBuildersStore
    {
        private readonly IConnectionManager _manager;
        private readonly GamesStore _gamesStore;        
        ConcurrentDictionary<Guid, GameBuilder> _gameBuildersStore = new ConcurrentDictionary<Guid, GameBuilder>();
        
        public GameBuilder LastUnStarted;
        public object LockForLastUnStarted = new object();

        public GameBuildersStore(IConnectionManager manager, GamesStore gamesStore)
        {
            _manager = manager;
            _gamesStore = gamesStore;
        }

        public GameBuilder Create()
        {
            var game = new GameBuilder(_manager, _gamesStore);
            _gameBuildersStore.TryAdd(game.GameId, game);
            return game;
        }

        public GameBuilder Load(Guid gameId)
        {
            GameBuilder game;
            if (!_gameBuildersStore.TryGetValue(gameId, out game))
            {
                throw new Exception($"Can't find gameId {gameId.ToString()}");
            }
            return game;
        }
    }
}
