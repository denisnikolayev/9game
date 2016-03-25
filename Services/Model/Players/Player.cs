using Game.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using System.Linq;

namespace Game.Model
{
    public class Player
    {
        public string Id
        {
            get
            {
                return Info.Id;
            }
        }
        public int Money
        {
            get
            {
                return Info.Money;
            }
            set
            {
                Info.Money = value;
            }
        }

        public string ConnectionId => Info.ConnectionId;

        public Card[] Cards { get; set; }
        public Card[] AvailableCards { get; set; }
        
        public User Info { get; set; }

        public IGameContext Game { get; private set; }
        public ILobbyContext Lobby { get; private set; }
        public bool IsHuman { get; set; } = true;

        public Player(User info, IGameContext game, ILobbyContext lobby)
        {
            this.Info = info;
            this.Game = game;
            this.Lobby = lobby;
        }

        public void RemoveCard(Card card)
        {
            Cards = Cards.Except(Cards.Where(a => a.Suit == card.Suit && a.Index == card.Index)).ToArray();
        }
    }
}