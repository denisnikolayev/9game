using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;

namespace Game.Model.Players
{
    public class ComputerBrain
    {
        public Card ChooseCard(bool[][] table, Player player)
        {
            return (from card in player.AvailableCards
                   let score = ScoreCardInLine(table[card.Suit], player.CardsInLine(card.Suit), card.Index)
                   orderby score descending
                   select card).First();    
        }

        

        private int ScoreCardInLine(bool[] row, bool[] player, int index)
        {
            var score = 0; // more is better to put this card

            // if we have next card - it's safy for us, as safy as line long            
            score += -MovingDependsOnIndex(index).TakeWhile(i => player[i]).Count();
            
            // if we have much far card - It's important for us to put it as far as important
            score += MovingDependsOnIndex(index).Where(i => player[i]).Select(i=>Math.Abs(i - 9)).DefaultIfEmpty().Max();
           
            // if it nine it's more important keepping it
            score += (index == 9)? -5 : 0;

            // if it's 6 or 14 - it's safe for us.
            score += (index == 6 || index == 14) ? 1 : 0;

            // if we have 9 and 10 and 8 - it's safe for us.
            score += (index == 9 && player[8] && player[10]) ? 1 : 0;

            return score;
        }

        private IEnumerable<int> MovingDependsOnIndex(int index)
        {
            if (index < 9)
            {
                for (var i = index - 1; i > 6; i--)
                {
                    yield return i;
                }
            }
            else
            {
                for (var i = index + 1; i < 15; i++)
                {
                    yield return i;
                }
            }
        }        
    }
}
