using System;
using Game.Server.Model;
using Game.Server.Model.Players;

namespace Game.Server.Clients
{
    public interface ILobbyContext
    {
        void Registered(User info);

        void Message(string message);

        void Connected(Guid gameId, User[] users);

        void GameStart(User[] info, int bankMoney, Card[] yourCards, Card[] avaliableCards);

        void PlayerConnected(User user);

        void RefreshMoney(int money);
    }
}
