using System;
using System.Collections.Concurrent;
using Game.Server.Model;

namespace Game.Server.Caches
{
    public class GameBuildersCache
    {              
        ConcurrentDictionary<Guid, GameBuilder> _gameBuildersStore = new ConcurrentDictionary<Guid, GameBuilder>();
        Func<GameBuilder> _gameBuilderResolver;
        

        public GameBuilder LastUnStarted;
        public object LockForLastUnStarted = new object();

        public GameBuildersCache(Func<GameBuilder> gameBuilderResolver)
        {
            _gameBuilderResolver = gameBuilderResolver; 
        }

        public GameBuilder Create()
        {
            var game = _gameBuilderResolver();
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
