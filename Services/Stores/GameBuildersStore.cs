using System;
using System.Collections.Concurrent;
using Game.Services.Model;

namespace Game.Services.Stores
{
    public class GameBuildersStore
    {        
        private readonly GamesStore _gamesStore;        
        ConcurrentDictionary<Guid, GameBuilder> _gameBuildersStore = new ConcurrentDictionary<Guid, GameBuilder>();
        Func<GameBuilder> _gameBuilderResolver;
        

        public GameBuilder LastUnStarted;
        public object LockForLastUnStarted = new object();

        public GameBuildersStore(Func<GameBuilder> gameBuilderResolver, GamesStore gamesStore)
        {
            _gameBuilderResolver = gameBuilderResolver; 
            _gamesStore = gamesStore;
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
