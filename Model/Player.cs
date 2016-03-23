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
        
        public PlayerInfo Info { get; set; }

        public Player(PlayerInfo info)
        {
            this.Info = info;
        }

    }
}