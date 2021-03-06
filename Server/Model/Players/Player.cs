﻿using System.Linq;
using Game.Server.Clients;

namespace Game.Server.Model.Players
{
    public class Player
    {
        public string Id
        {
            get
            {
                return User.Id;
            }
        }
        public int Money
        {
            get
            {
                return User.Money;
            }
            set
            {
                User.Money = value;
            }
        }       

        public Card[] Cards { get; set; }
        public Card[] AvailableCards { get; set; }
        
        public User User { get; set; }

        public IGameContext Game { get; private set; }
        public ILobbyContext Lobby { get; private set; }
        public IChatContext Chat { get; private set; }

        public bool IsHuman => User.IsHuman;        

        public Player(User user, IGameContext game, ILobbyContext lobby, IChatContext chat)
        {
            this.User = user;
            this.Game = game;
            this.Lobby = lobby;
            this.Chat = chat;
        }

        public void RemoveCard(Card card)
        {
            Cards = Cards.Except(Cards.Where(a => a.Suit == card.Suit && a.Index == card.Index)).ToArray();
        }

        public bool[] CardsInLine(int suit)
        {
            return Enumerable.Range(0, 15).Select(index=>new Card(suit, index)).Select(Cards.Contains).ToArray();
        }

        public static implicit operator User(Player player)
        {
            return player?.User;
        }
    }
}