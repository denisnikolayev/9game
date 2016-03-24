using Game.Hubs;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Model
{
    public class GameTest
    {
        public IHubConnectionContext<IGameContext> game;

        public GameTest()
        {
            //this.game = game;
        }

        public void YourTurn(string id, Card[] cards)
        {
            game.Client(id).YourTurn(cards);
        }
    }
}
