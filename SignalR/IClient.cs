using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Game.Model;

namespace Game.SignalR
{
    public interface IClient
    {
        void LogOnClient(string message);

        void PutCardOnTheTable(string name, Card card);

        void GameBegin(Card[] cards, int money, string[] playersNames, Card[] avalibleCards);

        void Connected(string name);

        void YourTurn(Card[] cards);

        void SkipTurn(string name);
    }
}
