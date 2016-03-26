using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;
using Game.Model.Players;

namespace Game.Services.Clients
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
    }
}
