using Game.Model.Players;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Services.Model
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
