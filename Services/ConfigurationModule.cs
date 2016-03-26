using Autofac;
using Game.Model;
using Game.Model.Players;
using Game.Services.Clients;
using Game.Services.Model;
using Game.Services.Stores;
using Microsoft.AspNet.SignalR.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Services
{
    public class ConfigurationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GamesStore>().SingleInstance();
            builder.RegisterType<UsersStore>().SingleInstance();
            builder.RegisterType<GameBuildersStore>().SingleInstance();

            builder.RegisterType<ComputerBrain>();
            builder.RegisterType<GameBuilder>();
            builder.RegisterType<LobbyContextStub>();
            builder.RegisterType<GameContextStub>();


            builder.Register<IGameContext>((c, p) =>
            {
                var connectionId = p.TypedAs<string>();
                if (!string.IsNullOrWhiteSpace(connectionId))
                {
                    return c.Resolve<IConnectionManager>().GetHubContext<GameService, IGameContext>().Clients.Client(connectionId);
                }
                else
                {
                    return c.Resolve<GameContextStub>();
                }
            });

            builder.Register<ILobbyContext>((c, p) =>
            {
                var connectionId = p.TypedAs<string>();
                if (!string.IsNullOrWhiteSpace(connectionId))
                {
                    return c.Resolve<IConnectionManager>().GetHubContext<LobbyServices, ILobbyContext>().Clients.Client(connectionId);
                }
                else
                {
                    return c.Resolve<LobbyContextStub>();
                }
            });


            builder.Register<Player>((c, p) =>
            {
                var user = p.TypedAs<User>();
                var gameContextResolver = c.Resolve<Func<string, IGameContext>>();
                var lobbyContextResolver = c.Resolve<Func<string, ILobbyContext>>();

                return new Player(user, gameContextResolver(user.ConnectionId), lobbyContextResolver(user.ConnectionId));
            });


            builder.Register<GameContext>((c, p) =>
            {
                var gameId = p.TypedAs<Guid>();
                var players = p.TypedAs<Player[]>();
                var computerBrain = c.Resolve<Func<ComputerBrain>>();

                return new GameContext(players, gameId, computerBrain);
            });
        }
    }
}
