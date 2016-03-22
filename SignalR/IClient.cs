using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Game.SignalR
{
    public interface IClient
    {
        void LogOnClient(string message);
    }
}
