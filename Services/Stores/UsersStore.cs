using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;
using Game.Model.Players;

namespace Game.Services.Stores
{
    public class UsersStore
    {
        readonly ConcurrentDictionary<string, User> players = new ConcurrentDictionary<string, User>();
        Random _random = new Random();
        

        public User Register(string name, string connectionId)
        {
            var playerInfo = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                ConnectionId = connectionId,
                Money = 250,
                IsHuman = true
            };

            players.TryAdd(playerInfo.ConnectionId, playerInfo);

            return playerInfo;
        }
        

        public User CreateComputer()
        {
            return new User()
            {
                Id = Guid.NewGuid().ToString(),
                Name = $"Computer #{_random.Next(9999)}",
                ConnectionId = null,
                Money = 250,
                IsHuman = false
            };
        }

        public User GetByConnectionId(string connectionId)
        {
            User user = null;
            players.TryGetValue(connectionId, out user);
            return user;
        }
    }
}
