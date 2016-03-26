using System;
using System.Collections.Concurrent;
using System.Linq;
using Game.Model;
using Microsoft.AspNet.SignalR.Infrastructure;
using Game.Services.Model;
using Game.Model.Players;

namespace Game.Services.Stores
{
    public class GamesStore
    {  
        ConcurrentDictionary<Guid, GameContext> gameContextsStore = new ConcurrentDictionary<Guid, GameContext>();
        Func<Player[], Guid, GameContext> _gameContextResolver;

        public GamesStore(Func<Player[], Guid, GameContext> gameContextResolver)
        {
            _gameContextResolver = gameContextResolver;
        }

        public GameContext Create(Player[] players, Guid gameId)
        {
            var game = _gameContextResolver(players, gameId);
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
