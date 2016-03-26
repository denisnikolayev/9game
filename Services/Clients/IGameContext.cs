using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Game.Model;
using Game.Services.Model;

namespace Game.Services.Clients
{
    public interface IGameContext
    {
        void PutCardOnTheTable(string name, Card card);

        void YourTurn(Card[] cards);

        void SkipTurn(string playerId, int lostMoney);

        void Finish(GameResult gameResult);
    }
}
