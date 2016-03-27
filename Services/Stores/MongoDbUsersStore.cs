using System.Linq;
using System.Security.Claims;
using Game.Model.Players;
using MongoDB.Driver;

namespace Game.Services.Stores
{
    public class MongoDbUsersStore : IUsersStore
    {
        private IMongoCollection<User> _users;

        public MongoDbUsersStore(IMongoCollection<User> users)
        {
            _users = users;
        }

        public User RegisterOrLoad(ClaimsPrincipal current)
        {
            var id = current.GetId();
            var findByIdFilter = Builders<User>.Filter.Eq(nameof(User.Id), id);

            var user = _users.Find(findByIdFilter).FirstOrDefault();
            
            if (user == null)
            {
                user = this.CreateUser(current);

                _users.InsertOne(user);
            }
            else
            {
                var newUser = this.CreateUser(current);                

                var update = Builders<User>.Update
                    .Set(nameof(user.AvatarUrl), newUser.AvatarUrl)
                    .Set(nameof(user.Name), newUser.Name);

                _users.UpdateOne(findByIdFilter, update);
            }

            return user;
        }

        public void UpdateMoney(User user)
        {
            var updateFilter = Builders<User>.Filter.Eq(nameof(user.Id), user.Id);
            var update = Builders<User>.Update.Set(nameof(user.Money), user.Money);
            _users.UpdateOne(updateFilter, update);
        }
    }
}
