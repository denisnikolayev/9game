using Game.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Hubs
{
    public interface ILobbyContext
    {
        void Registered(PlayerInfo info);

        void Message(string message);

        void Connected(string gameId, PlayerInfo[] players);

        void GameStart(PlayerInfo[] info, int bankMoney, Card[] yourCards, Card[] avaliableCards);

        void PlayersConnected(PlayerInfo[] players);
    }
}
