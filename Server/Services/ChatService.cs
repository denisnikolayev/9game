using Game.Server.Caches;
using Game.Server.Clients;
using Game.Server.Model.Players;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Game.Server.Services
{
    [HubName("Chat")]
    public class ChatService : Hub<IChatContext>
    {
        private readonly UsersCache _usersCache;
        private User User => _usersCache[Context.ConnectionId];

        public ChatService(UsersCache usersCache)
        {
            _usersCache = usersCache;
        }

        public void SendMessage(string message)
        {
            Clients.All.RecieveMessage(User, message);
        }
    }
}
