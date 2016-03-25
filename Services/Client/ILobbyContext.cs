using Game.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Hubs
{
    public interface ILobbyContext
    {
        void Registered(User info);

        void Message(string message);

        void Connected(Guid gameId, User[] users);

        void GameStart(User[] info, int bankMoney, Card[] yourCards, Card[] avaliableCards);

        void PlayerConnected(User user);
    }
}
