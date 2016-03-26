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

namespace Game.Services
{
    [HubName("Game")]
    public class GameService : Hub<IGameContext>
    {
        private readonly GamesStore _gameStore;
        private readonly UsersStore _userStore;

        public GameService(GamesStore gameStore, UsersStore userStore)
        {
            _gameStore = gameStore;
            _userStore = userStore;
        }

        public void PutCardOnTheTable(Guid gameId, Card card)
        {
            var user = _userStore.GetByConnectionId(Context.ConnectionId);
            var game = _gameStore.Load(gameId);

            var player = game.Player(user);

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
