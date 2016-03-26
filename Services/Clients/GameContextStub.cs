using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;

namespace Game.Services.Clients
{
    public class GameContextStub : IGameContext
    {
        public void PutCardOnTheTable(string name, Card card)
        {
            
        }

        public void SkipTurn(string playerId, int lostMoney)
        {
            
        }

        public void YourTurn(Card[] cards)
        {
            
        }
    }
}
