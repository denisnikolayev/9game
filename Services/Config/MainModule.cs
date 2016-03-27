﻿using Autofac;
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
            builder.RegisterType<GamesCache>().SingleInstance();
           
            builder.RegisterType<GameBuildersCache>().SingleInstance();
            builder.RegisterType<UsersCache>().SingleInstance();

            builder.RegisterType<ComputerBrain>();
            builder.RegisterType<GameBuilder>();
            builder.RegisterType<LobbyContextStub>();
            builder.RegisterType<GameContextStub>();
            builder.RegisterType<ChatContextStub>();
            builder.RegisterType<GameContext>();
            builder.RegisterType<GameResult>();
            builder.RegisterType<ChatService>();

            builder.Register((c, p) =>
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

            builder.Register((c, p) =>
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


            builder.Register((c, p) =>
            {
                var connectionId = p.TypedAs<string>();
                if (!string.IsNullOrWhiteSpace(connectionId))
                {
                    return c.Resolve<IConnectionManager>().GetHubContext<ChatService, IChatContext>().Clients.Client(connectionId);
                }
                else
                {
                    return c.Resolve<ChatContextStub>();
                }
            });


            builder.Register<Player>((c, p) =>
            {
                var user = p.TypedAs<User>();
                var connectionId = p.TypedAs<string>();
                var gameContextResolver = c.Resolve<Func<string, IGameContext>>();
                var lobbyContextResolver = c.Resolve<Func<string, ILobbyContext>>();
                var chatContextResolver = c.Resolve<Func<string, IChatContext>>();

                return new Player(user,
                    gameContextResolver(connectionId),
                    lobbyContextResolver(connectionId),
                    chatContextResolver(connectionId));
            });
        }
    }
}
