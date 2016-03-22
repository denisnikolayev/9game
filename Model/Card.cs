using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Game.Model
{
    public class Card
    {
        [JsonProperty("suit")]
        public int Suit { get; set; }
        [JsonProperty("index")]
        public int Index { get; set; }
    }
}
