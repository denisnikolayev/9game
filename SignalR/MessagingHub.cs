using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Extensions.Logging;

namespace Game.SignalR
{
    [HubName("Messaging")]
    public class MessagingHub : Hub<IClient>
    {
        public void Log(string message)
        {
            Clients.All.LogOnClient(message + " yep");
        }
    }
}
