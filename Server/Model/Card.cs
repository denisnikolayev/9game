using System;
using Newtonsoft.Json;

namespace Game.Server.Model
{
    public class Card
    {
        [JsonProperty("suit")]
        public int Suit { get; set; }
        [JsonProperty("index")]
        public int Index { get; set; }

        public Card()
        {

        }

        public Card(int suit, int index)
        {
            Suit = suit;
            Index = index;
        }

        public override int GetHashCode() => this.Suit.GetHashCode() ^ this.Index.GetHashCode();
        public override bool Equals(object other) => this?.Suit == (other as Card)?.Suit && this?.Index == (other as Card)?.Index;
        public static bool operator ==(Card a, Card b) => Object.ReferenceEquals(a, b) || a?.Equals(b) == true;
        public static bool operator !=(Card a, Card b) => !(a == b);
    }
}
