using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Game.Model;
using Game.Model.Players;
using System.Security.Claims;
using System.Threading;

namespace Game.Services.Stores
{
    public class UsersStore
    {
        readonly ConcurrentDictionary<string, User> playersById = new ConcurrentDictionary<string, User>();
        readonly ConcurrentDictionary<string, User> players = new ConcurrentDictionary<string, User>();
        Random _random = new Random();
        static int guestNumber = 0;

        public User RegisterAsGuest(string connectionId)
        {
            Interlocked.Increment(ref guestNumber);

            var user = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Guest #" + guestNumber,
                ConnectionId = connectionId,
                Money = 250,
                IsHuman = true
            };

            players.TryAdd(user.ConnectionId, user);

            return user;
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

        public User Register(ClaimsPrincipal current, string connectionId)
        {
            var id = current.Identity.AuthenticationType + "/" + current.FindFirst(ClaimTypes.NameIdentifier).Value;

            User user;

            if (!playersById.TryGetValue(id, out user))
            {
                user = new User()
                {
                    Id = id,
                    Name = current.Identity.Name,
                    AvatarUrl = current.FindFirst("Photo").Value,
                    Money = 250,
                    IsHuman = true
                };

                playersById.TryAdd(user.Id, user);                
            }
            user.ConnectionId = connectionId;
            players.TryAdd(user.ConnectionId, user);

            return user;
        }

        public User GetByConnectionId(string connectionId)
        {
            User user = null;
            players.TryGetValue(connectionId, out user);
            return user;
        }
    }
}
