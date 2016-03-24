using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;

namespace Game.Hubs
{
    [HubName("Lobby")]
    public class LobbyHub : Hub<ILobbyContext>
    {
        public static ConcurrentDictionary<string, PlayerInfo> players = new ConcurrentDictionary<string, PlayerInfo>();

        public void RegisterUser(string name)
        {
            var playerInfo = new PlayerInfo()
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                ConnectionId = Context.ConnectionId,
                Money = 250
            };

            players.TryAdd(playerInfo.ConnectionId, playerInfo);           

            Clients.Caller.Registered(playerInfo);
        }

        public static GameContext game;

        public void ConnectToRandomGame()
        {
            PlayerInfo playerInfo = null;
            players.TryGetValue(Context.ConnectionId, out playerInfo);

            if (game == null)
            {
                game = new GameContext();
                game.Players[game.CurrentPlayer++] = new Player(playerInfo);
                Clients.Caller.Connected(game.Id.ToString(), new PlayerInfo[0]);
            }
            else
            {
                Clients.Caller.Connected(game.Id.ToString(), game.Players.Select(player => player?.Info).Where(info => info != null).ToArray());

                foreach (var player in game.Players.Where(p => p != null))
                {
                    this.Clients.Client(player.ConnectionId).PlayersConnected(new[] { playerInfo });
                }

                game.Players[game.CurrentPlayer++] = new Player(playerInfo);

                if (game.CurrentPlayer == 3)
                {
                    game.ShuffleCards();
                    var player = game.Players.First(a => a.Cards.Any(b => b.Suit == 3 && b.Index == 9));

                    game.CurrentPlayer = Array.IndexOf(game.Players, player);

                    var playersInfo = game.Players.Select(a => a.Info).ToArray();
                    foreach (var p in game.Players)
                    {
                        Clients.Client(p.ConnectionId).GameStart(
                             playersInfo
                            , p.Money
                            , p.Cards
                            , p == player ? new[] { new Card { Suit = 3, Index = 9 } } : new Card[0]);
                    }
                }
            }
        }
    }
}
