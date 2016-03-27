using System;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Game.Services.Stores;
using Game.Services.Clients;
using Game.Model.Players;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Game.Services
{
    [HubName("Lobby")]    
    public class LobbyServices : Hub<ILobbyContext>
    {
        private readonly GameBuildersCache _gameBuildersCache;
        private readonly IUsersStore _usersStore;
        private readonly UsersCache _usersCache;
        private readonly Func<User, string, Player> _playerResolver;

        private User User => _usersCache[Context.ConnectionId];

        public LobbyServices(IUsersStore usersStore, GameBuildersCache gameBuildersCache, UsersCache usersCache, Func<User, string, Player> playerResolver)
        {
            _gameBuildersCache = gameBuildersCache;
            _usersStore = usersStore;
            _usersCache = usersCache;
            _playerResolver = playerResolver;
        }


        public void RegisterUser()
        {
            User user;
            if (Context.User.Identity.IsAuthenticated)
            {
                user = _usersStore.RegisterOrLoad(Context.User as ClaimsPrincipal);                
            }
            else
            {
                user = _usersStore.RegisterAsGuest(Context.ConnectionId);
            }
            _usersCache[Context.ConnectionId] = user;
            Clients.Caller.Registered(user);
        }
        

        public void ConnectToGame(Guid gameId)
        {
            _gameBuildersCache
                .Load(gameId)
                .Connect(_playerResolver(User, Context.ConnectionId));
        }       


        public void ConnectToRandomGame()
        {
            lock (_gameBuildersCache.LockForLastUnStarted)
            {
                var last = _gameBuildersCache.LastUnStarted;

                if (last == null || last.IsFull())
                {
                    last = _gameBuildersCache.Create();
                }
                last.Connect(_playerResolver(User, Context.ConnectionId));

                _gameBuildersCache.LastUnStarted = last;                
            }
        }


        public void CreateFriendGame()
        {
            _gameBuildersCache
                .Create()
                .Connect(_playerResolver(User, Context.ConnectionId));
        }

        public void PlayWithComputer()
        {
            var game = _gameBuildersCache.Create();
            game.Connect(_playerResolver(User, Context.ConnectionId));
            game.Connect(_playerResolver(_usersStore.CreateComputer(), null));
            game.Connect(_playerResolver(_usersStore.CreateComputer(), null));
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            _usersCache[Context.ConnectionId] = null;

            return base.OnDisconnected(stopCalled);
        }
    }
}
