using System;
using System.Collections.Concurrent;
using System.Linq;
using Game.Model;
using Microsoft.AspNet.SignalR.Infrastructure;
using Game.Services.Model;

namespace Game.Services.Stores
{
    public class GamesStore
    {
        private readonly IConnectionManager _manager;
        private readonly ComputerBrain _computerBrain;
        ConcurrentDictionary<Guid, GameContext> gameContextsStore = new ConcurrentDictionary<Guid, GameContext>();
       

        public GamesStore(IConnectionManager manager, ComputerBrain computerBrain)
        {
            _manager = manager;
            _computerBrain = computerBrain;
        }

        public GameContext Create(Player[] players, Guid gameId)
        {
            var game = new GameContext(players, gameId, _computerBrain);
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
