using System;
using System.Collections.Concurrent;
using System.Linq;
using Game.Model;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace Game.Services.Stores
{
    public class GamesStore
    {
        private readonly IConnectionManager _manager;
        ConcurrentDictionary<Guid, GameContext> gameContextsStore = new ConcurrentDictionary<Guid, GameContext>();
       

        public GamesStore(IConnectionManager manager)
        {
            _manager = manager;
        }

        public GameContext Create(Player[] players, Guid gameId)
        {
            var game = new GameContext(players, gameId);
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
    }
}
