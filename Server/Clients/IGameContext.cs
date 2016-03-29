using Game.Server.Model;

namespace Game.Server.Clients
{
    public interface IGameContext
    {
        void PutCardOnTheTable(string name, Card card);

        void YourTurn(Card[] cards);

        void SkipTurn(string playerId, int lostMoney);

        void Finish(GameResult gameResult);
    }
}
