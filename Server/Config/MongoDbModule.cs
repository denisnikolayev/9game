using Autofac;
using Game.Server.Model.Players;
using Game.Server.Stores;
using Microsoft.Extensions.OptionsModel;
using MongoDB.Driver;

namespace Game.Server.Config
{
    public class MongoDbModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.Register<IUsersStore>(context=>
            {
                var options = context.Resolve<IOptions<MongoDbConfig>>().Value;
                if (options.Use)
                {
                    return context.Resolve<MongoDbUsersStore>();
                }
                else
                {
                    return context.Resolve<MemoryUsersStore>();
                }

            }).SingleInstance();

            builder.RegisterType<MongoDbUsersStore>();
            builder.RegisterType<MemoryUsersStore>();

            builder.Register(context =>
            {
                var options = context.Resolve<IOptions<MongoDbConfig>>().Value;
                return new MongoClient(options.Url);
            });

            builder.Register(context =>
            {
                var options = context.Resolve<IOptions<MongoDbConfig>>().Value;
                var client = context.Resolve<MongoClient>();
                return client.GetDatabase(options.DatabaseName);
            });

            builder.Register(context => context.Resolve<IMongoDatabase>().GetCollection<User>("Users"));
        }
    }

    public class MongoDbConfig
    {
        public string Url { get; set; }

        public string DatabaseName { get; set; }

        public bool Use { get; set; }
    }
}
