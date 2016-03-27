using Game.Model.Players;
using Game.Services.Clients;
using Game.Services.Stores;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Services
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
