using Game.Model;
using Game.Model.Players;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Services.Clients
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
