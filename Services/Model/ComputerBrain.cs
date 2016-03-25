using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Model;

namespace Game.Services.Model
{
    public class ComputerBrain
    {
        public Card ChooseCard(bool[][] table, Player player)
        {
            return player.AvailableCards.First();    
        }
    }
}
