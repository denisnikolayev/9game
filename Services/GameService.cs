using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;
using Game.Services.Stores;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Extensions.Logging;
using Game.Services.Clients;
using Game.Model.Players;

namespace Game.Services
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
