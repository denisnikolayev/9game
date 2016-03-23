using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;

namespace Game.Hubs
{
    [HubName("Lobby")]
    public class LobbyHub : Hub<ILobbyContext>
    {
        public static ConcurrentDictionary<string, PlayerInfo> players = new ConcurrentDictionary<string, PlayerInfo>();

        public void RegisterUser(string name)
        {
            var playerInfo = new PlayerInfo()
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                ConnectionId = Context.ConnectionId,
                Money = 250
            };

            players.TryAdd(playerInfo.Id, playerInfo);

            Clients.All.Message("testst");

            Clients.Caller.Registered(playerInfo);
            Clients.All.Registered(playerInfo);

        }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

    }
}
