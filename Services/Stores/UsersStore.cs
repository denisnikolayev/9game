using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;

namespace Game.Services.Stores
{
    public class UsersStore
    {
        public static ConcurrentDictionary<string, PlayerInfo> players = new ConcurrentDictionary<string, PlayerInfo>();

        public PlayerInfo Register(string name, string connectionId)
        {
            var playerInfo = new PlayerInfo()
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                ConnectionId = connectionId,
                Money = 250
            };

            players.TryAdd(playerInfo.ConnectionId, playerInfo);

            return playerInfo;
        }

        public PlayerInfo this[string connectionId]
        {
            get
            {
                PlayerInfo playerInfo = null;
                players.TryGetValue(connectionId, out playerInfo);
                return playerInfo;
            }
        }
    }
}
