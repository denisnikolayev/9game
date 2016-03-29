using Game.Server.Model.Players;
using Newtonsoft.Json;

namespace Game.Server.Model
{
    public class GameResult
    {
        [JsonProperty("otherUsers")]
        public User[] OtherUsers {get; set; }

        [JsonProperty("winner")]
        public User Winner { get; set; }

        [JsonProperty("bankMoney")]
        public int BankMoney { get; set; }
    }
}
