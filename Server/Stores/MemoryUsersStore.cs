using System.Collections.Concurrent;
using System.Security.Claims;
using Game.Server.Model.Players;

namespace Game.Server.Stores
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
