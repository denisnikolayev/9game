using Game.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;

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

        public string ConnectionId
        {
            get
            {
                return Info.ConnectionId;
            }
        }

        public Card[] Cards { get; set; }
        public Card[] AvailableCards { get; set; }
        
        public PlayerInfo Info { get; set; }

        public IGameContext Game { get; private set; }
        public ILobbyContext Lobby { get; private set; }

        public Player(PlayerInfo info, IGameContext game, ILobbyContext lobby)
        {
            this.Info = info;
            this.Game = game;
            this.Lobby = lobby;
        }

    }
}