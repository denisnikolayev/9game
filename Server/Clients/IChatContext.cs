using Game.Server.Model.Players;

namespace Game.Server.Clients
{
    public interface IChatContext
    {
        void RecieveMessage(User who, string message);
    }
}
