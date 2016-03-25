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
        private readonly GameBuildersStore _gameBuildersStore;
        private readonly UsersStore _usersStore;
        
        private User User => _usersStore.GetByConnectionId(Context.ConnectionId);

        public LobbyServices(UsersStore usersStore, GameBuildersStore gameBuildersStore)
        {
            _gameBuildersStore = gameBuildersStore;
            _usersStore = usersStore;
        }


        public void RegisterUser(string name)
        {
            var player = _usersStore.Register(name, Context.ConnectionId);
            Clients.Caller.Registered(player);
        }

        public void ConnectToGame(Guid gameId)
        {
            var game = _gameBuildersStore.Load(gameId);
            game.Connect(User);
        }

        public void ConnectToRandomGame()
        {
            lock (_gameBuildersStore.LockForLastUnStarted)
            {
                var last = _gameBuildersStore.LastUnStarted;

                if (last == null || last.IsFull())
                {
                    last = _gameBuildersStore.Create();
                }
                last.Connect(User);

                _gameBuildersStore.LastUnStarted = last;                
            }
        }
    }
}
