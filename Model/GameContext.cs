using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Model
{
    public class GameContext
    {
        public Guid Id { get; set; }
        public bool[][] Table { get; set; }
        public Player[] Players { get; set; } = new Player[3];
        public int BankMoney { get; set; }
        public int CurrentPlayer {get; set;} = 0;


        public GameContext() {
            Table = Enumerable.Range(0, 4).Select(suit => Enumerable.Range(0, 15).Select(a => false).ToArray()).ToArray();
        }

        public void ShuffleCards()
        {
            var rnd = new Random();
            var cards = from suit in Enumerable.Range(0, 4)
                        from index in Enumerable.Range(6, 9)                        
                        select new Card() { Suit = suit, Index = index };

            var group = cards.ToArray().OrderBy(a=>rnd.NextDouble()).ToArray().Select((c, i) => new { c, i }).GroupBy(a => a.i / 12);
          

            foreach (var g in group)
            {
                Players[g.Key].Cards = g.ToArray().OrderBy(a => a.c.Suit).ThenBy(a => a.c.Index).Select(a => a.c).ToArray();  
            }
        }
    }
}
