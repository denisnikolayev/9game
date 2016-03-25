using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using Game.Hubs;
using Game.Hubs.Services;
using Game.Hubs.Services.Store;
using Game.Services.Stores;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace Game.Services
{
    [HubName("Lobby")]
    public class LobbyServices : Hub<ILobbyContext>
    {
        private readonly GamesStore _gamesStore;
        private readonly UsersStore _usersStore;
        
        private PlayerInfo User => _usersStore[Context.ConnectionId];

        public LobbyServices(GamesStore gamesStore, UsersStore usersStore)
        {
            _gamesStore = gamesStore;
            _usersStore = usersStore;
        }


        public void RegisterUser(string name)
        {
            var player = _usersStore.Register(name, Context.ConnectionId);
            Clients.Caller.Registered(player);
        }

        public void ConnectToGame(Guid gameId)
        {
            var playerInfo = _usersStore[Context.ConnectionId];
            var game = _gamesStore.Load(gameId);
            game.Connect(User);

            _gamesStore.Save(game);
        }

        public void ConnectToRandomGame()
        {
            lock (_gamesStore.LockForLastUnStarted)
            {
                var last = _gamesStore.LastUnStarted;

                if (last == null || last.isFull())
                {
                    last = _gamesStore.Create();
                }
                last.Connect(User);

                _gamesStore.LastUnStarted = last;
                _gamesStore.Save(_gamesStore.LastUnStarted);
            }
        }
    }
}
