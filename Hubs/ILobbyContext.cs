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
    }
}
