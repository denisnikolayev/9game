using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Extensions.Logging;

namespace Game.Hubs
{
    [HubName("Game")]
    public class GameHub : Hub<IGameContext>
    {
        

        public void Log(string message)
        {
            Clients.All.LogOnClient(message + " yep " + Context.ConnectionId);
        }

        public void PutCardOnTheTable(Card card)
        {
            PlayerInfo playerInfo = null;
            LobbyHub.players.TryGetValue(Context.ConnectionId, out playerInfo);

            foreach (var p in LobbyHub.game.Players)
            {
                Clients.Client(p.ConnectionId).PutCardOnTheTable(playerInfo.Id, card);
            }

            LobbyHub.game.Table[card.Suit][card.Index] = true;

            while (true)
            {
                LobbyHub.game.CurrentPlayer = (LobbyHub.game.CurrentPlayer + 1) % 3;
                var player = LobbyHub.game.Players[LobbyHub.game.CurrentPlayer];
                var cards = player.Cards.Where(c => c.Index == 9 || c.Index > 6 && LobbyHub.game.Table[c.Suit][c.Index - 1] || c.Index < 14 && LobbyHub.game.Table[c.Suit][c.Index + 1]).ToArray();
                if (cards.Any())
                {
                    Clients.Client(player.ConnectionId).YourTurn(cards);
                    return;
                }
                else
                {
                    foreach (var p in LobbyHub.game.Players)
                    {
                        Clients.Client(p.ConnectionId).SkipTurn(player.Id);
                    }
                }
            }
        }
    }
}
