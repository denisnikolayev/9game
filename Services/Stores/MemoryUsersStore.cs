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
    public class MemoryUsersStore : IUsersStore
    {
        readonly ConcurrentDictionary<string, User> playersById = new ConcurrentDictionary<string, User>();
                

        public User RegisterOrLoad(ClaimsPrincipal current)
        {            
            User user;

            if (!playersById.TryGetValue(current.GetId(), out user))
            {
                user = this.CreateUser(current);
                playersById.TryAdd(user.Id, user);                
            }           

            return user;
        }

        public void UpdateMoney(User user)
        {
            
        }
    }
}
