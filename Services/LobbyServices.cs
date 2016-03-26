using System;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Game.Services.Stores;
using Game.Services.Clients;
using Game.Model.Players;

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
            _gameBuildersStore
                .Load(gameId)
                .Connect(User);
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


        public void CreateFriendGame()
        {
            _gameBuildersStore
                .Create()
                .Connect(User);
        }

        public void PlayWithComputer()
        {
            var game = _gameBuildersStore.Create();
            game.Connect(User);
            game.Connect(_usersStore.CreateComputer());
            game.Connect(_usersStore.CreateComputer());
        }
    }
}
