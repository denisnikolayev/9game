using System;
using System.Security.Claims;
using System.Threading;
using Game.Server.Model.Players;

namespace Game.Server.Stores
{
    public interface IUsersStore
    {
        User RegisterOrLoad(ClaimsPrincipal current);
        void UpdateMoney(User user);
    }



    public static class IUsersStoreExtentions
    {
        static int lastNumber = 0;

        public static string GetId(this ClaimsPrincipal current)
        {
            return current.Identity.AuthenticationType + "/" + current.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        public static User CreateUser(this IUsersStore store, ClaimsPrincipal current)
        {
            var user = new User()
            {
                Id = current.GetId(),
                Name = current.Identity.Name,
                AvatarUrl = current.FindFirst("Photo").Value,
                Money = 250,
                IsHuman = true
            };

            return user;
        }

        public static User RegisterAsGuest(this IUsersStore store, string connectionId)
        {
            Interlocked.Increment(ref lastNumber);

            var user = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Name = $"Guest #{lastNumber}",
                Money = 250,
                IsHuman = true
            };

            return user;
        }


        public static User CreateComputer(this IUsersStore store)
        {
            Interlocked.Increment(ref lastNumber);

            return new User()
            {
                Id = Guid.NewGuid().ToString(),
                Name = $"Computer #{lastNumber}",
                Money = 250,
                IsHuman = false
            };
        }
    }
}
