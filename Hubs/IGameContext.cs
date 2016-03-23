using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Game.Model;

namespace Game.Hubs
{
    public interface IGameContext
    {
        void LogOnClient(string message);

        void PutCardOnTheTable(string name, Card card);
        

        void YourTurn(Card[] cards);

        void SkipTurn(string name);
    }
}
