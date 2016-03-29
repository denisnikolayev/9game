using System;
using Game.Server.Model;
using Game.Server.Model.Players;

namespace Game.Server.Clients
{
    public class LobbyContextStub : ILobbyContext
    {
        public void Connected(Guid gameId, User[] users)
        {
            
        }

        public void GameStart(User[] info, int bankMoney, Card[] yourCards, Card[] avaliableCards)
        {
           
        }

        public void Message(string message)
        {
            
        }

        public void PlayerConnected(User user)
        {
            
        }

        public void Registered(User info)
        {
            
        }

        public void RefreshMoney(int money)
        {

        }
    }
}
