using Game.Model.Players;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Services.Stores
{
    public class UsersCache
    {
        readonly ConcurrentDictionary<string, User> players = new ConcurrentDictionary<string, User>();


        public User this[string connectionId]
        {
            get
            {
                User user = null;
                players.TryGetValue(connectionId, out user);
                return user;
            }

            set
            {
                if (connectionId != null)
                {
                    if (value != null)
                    {
                        players.TryAdd(connectionId, value);
                    }
                    else
                    {
                        User garbage;
                        players.TryRemove(connectionId, out garbage);
                    }
                }
            }
        }
    }
}
