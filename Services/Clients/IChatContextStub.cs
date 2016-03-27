using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model.Players;

namespace Game.Services.Clients
{
    public class ChatContextStub : IChatContext
    {
        public void RecieveMessage(User who, string message)
        {
            
        }
    }
}
