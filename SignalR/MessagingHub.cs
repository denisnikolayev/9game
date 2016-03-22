using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Extensions.Logging;

namespace Game.SignalR
{
    [HubName("Messaging")]
    public class MessagingHub : Hub<IClient>
    {
        static GameContext game;

        public void Log(string message)
        {
            Clients.All.LogOnClient(message + " yep " + Context.ConnectionId);
        }

        public void PutCardOnTheTable(Card card)
        {
            foreach (var p in game.Players)
            {
                Clients.Client(p.Name).PutCardOnTheTable(Context.ConnectionId, card);
            }

            game.Table[card.Suit][card.Index] = true;

            while (true)
            {
                game.CurrentPlayer = (game.CurrentPlayer + 1) % 3;
                var player = game.Players[game.CurrentPlayer];
                var cards = player.Cards.Where(c => c.Index == 9 || c.Index > 6 && game.Table[c.Suit][c.Index - 1] || c.Index < 14 && game.Table[c.Suit][c.Index + 1]).ToArray();
                if (cards.Any())
                {
                    Clients.Client(player.Name).YourTurn(cards);
                    return;
                }
                else
                {
                    foreach (var p in game.Players) {
                        Clients.Client(p.Name).SkipTurn(player.Name);
                    }
                }
            }
        }

        public override Task OnConnected()
        {
            if (game == null)
            {
                game = new GameContext();
                game.Players[game.CurrentPlayer++] = new Player() { Money = 250, Name = Context.ConnectionId };
                Clients.Caller.Connected(Context.ConnectionId);
            }
            else
            {
                Clients.Caller.Connected(Context.ConnectionId);

                game.Players[game.CurrentPlayer++] = new Player() { Money = 250, Name = Context.ConnectionId };
                if (game.CurrentPlayer == 3)
                {
                    game.ShuffleCards();
                    var player = game.Players.First(a => a.Cards.Any(b => b.Suit == 3 && b.Index == 9));

                    game.CurrentPlayer = Array.IndexOf(game.Players, player);

                    foreach (var p in game.Players)
                    {
                        Clients.Client(p.Name).GameBegin(
                             p.Cards
                            , p.Money
                            , game.Players.Select(a => a.Name).ToArray()
                            , p == player?new[] { new Card { Suit = 3, Index = 9 }}:new Card[0]);
                    }
                }
            }
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            game = null;
            return base.OnDisconnected(stopCalled);
        }
    }
}
