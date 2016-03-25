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
        static readonly ConcurrentDictionary<string, User> players = new ConcurrentDictionary<string, User>();

        public User Register(string name, string connectionId)
        {
            var playerInfo = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                ConnectionId = connectionId,
                Money = 250
            };

            players.TryAdd(playerInfo.ConnectionId, playerInfo);

            return playerInfo;
        }

        public User GetByConnectionId(string connectionId)
        {
            User user = null;
            players.TryGetValue(connectionId, out user);
            return user;
        }
    }
}
