using System;
using System.Collections.Concurrent;
using System.Linq;
using Game.Model;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace Game.Hubs.Services.Store
{
    public class GamesStore
    {
        private readonly IConnectionManager _manager;
        ConcurrentDictionary<Guid, GameContext> gameContextsStore = new ConcurrentDictionary<Guid, GameContext>();
        ConcurrentDictionary<string, GameContext> gameContextsByConnectionIdStore = new ConcurrentDictionary<string, GameContext>();
        
        public GameContext LastUnStarted;
        public object LockForLastUnStarted = new object();

        public GamesStore(IConnectionManager manager)
        {
            _manager = manager;
        }

        public GameContext Create()
        {
            var game = new GameContext(_manager);
            gameContextsStore.TryAdd(game.Id, game);
            return game;
        }

        public GameContext CreateOrGetLastUnstarted()
        {
            var game = new GameContext(_manager);
            gameContextsStore.TryAdd(game.Id, game);
            return game;
        }

        public GameContext Load(Guid gameId)
        {
            GameContext game;
            if (!gameContextsStore.TryGetValue(gameId, out game))
            {
                throw new Exception($"Can't find gameId {gameId.ToString()}");
            }
            return game;
        }

        public GameContext LoadByConnectionId(string connectionId)
        {
            GameContext game;
            if (!gameContextsByConnectionIdStore.TryGetValue(connectionId, out game))
            {
                throw new Exception($"Can't find game by connectionId {connectionId}");
            }
            return game;
        }

        public void Save(GameContext game)
        {
            foreach (var connectionId in game.Players.Select(p => p?.Info?.ConnectionId).Where(c =>!string.IsNullOrWhiteSpace(c)))
            {
                gameContextsByConnectionIdStore.AddOrUpdate(connectionId, game, (id, old) => game);
            }   
        }


    }
}
