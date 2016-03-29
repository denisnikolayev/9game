using Game.Server.Model;

namespace Game.Server.Clients
{
    public class GameContextStub : IGameContext
    {
        public void Finish(GameResult gameResult)
        {
            
        }

        public void PutCardOnTheTable(string name, Card card)
        {
            
        }

        public void SkipTurn(string playerId, int lostMoney)
        {
            
        }

        public void YourTurn(Card[] cards)
        {
            
        }
    }
}
