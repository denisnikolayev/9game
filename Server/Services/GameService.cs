using System;
using Game.Server.Caches;
using Game.Server.Clients;
using Game.Server.Model;
using Game.Server.Model.Players;
using Game.Server.Stores;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Game.Server.Services
{
    [HubName("Game")]
    public class GameService : Hub<IGameContext>
    {
        private readonly GamesCache _gameCache;
        private readonly IUsersStore _userStore;
        private readonly UsersCache _usersCache;

        private User User => _usersCache[Context.ConnectionId];

        public GameService(GamesCache gameCache, IUsersStore userStore, UsersCache usersCache)
        {
            _gameCache = gameCache;
            _userStore = userStore;
            _usersCache = usersCache;
        }

        public void PutCardOnTheTable(Guid gameId, Card card)
        {            
            var game = _gameCache[gameId];

            var player = game.Player(User);

            if (game.ValidateStep(player, card))
            {
                lock (game._lockObject)
                {
                    game.PutCardOnTheTable(player, card);
                }
            }
        }        
    }
}
