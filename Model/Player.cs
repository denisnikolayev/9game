namespace Game.Model
{
    public class Player
    {
        public string Id { get; set; }
        public int Money { get; set; }
        public Card[] Cards { get; set; }
        public string Name { get; set; }
    }
}