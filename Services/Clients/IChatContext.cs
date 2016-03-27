using Game.Model.Players;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Services.Clients
{
    public interface IChatContext
    {
        void RecieveMessage(User who, string message);
    }
}
