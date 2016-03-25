using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Hubs;
using Game.Services;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace Game.Model
{
    public class GameContext
    {
        public Guid Id { get; set; }
        public bool[][] Table { get; set; }
        public Player[] Players { get; set; }
        public int BankMoney { get; set; }
        public int CurrentPlayer {get; set;} = 0;

        public readonly object _lockObject = new Object();

        public GameContext(Player[] players, Guid gameId)
        {
            Table = Enumerable.Range(0, 4).Select(suit => new bool[15]).ToArray();
            Id = gameId;
            Players = players;

            SetFirstPlayer();
        }

        private void SetFirstPlayer()
        {
            var player = Players.First(a => a.Cards.Any(b => b.Suit == 3 && b.Index == 9));
            player.AvailableCards = new[] {new Card {Suit = 3, Index = 9}};

            CurrentPlayer = Array.IndexOf(Players, player);
        }
             


        public void PutCardOnTheTable(Card card, Player player)
        {
        PuttingCard:
            PutCard(card, player);
            goto MovingToNextPlayer;


        MovingToNextPlayer:
            player = MoveTurnToNextPlayer();
            player.AvailableCards = player.Cards.Where(CanPutCard).ToArray();

            if (player.AvailableCards.Any())
            {
                if (player.IsHuman)
                {
                    goto WaitHumanChoose;
                }
                else
                {
                    goto ComputerChoosingCard;
                }
            }
            else
            {
                goto SkippingTurn;
            }


        SkippingTurn:
            foreach (var p in Players)
            {
                p.Game.SkipTurn(player.Id, 50);
            }
            goto MovingToNextPlayer;


        ComputerChoosingCard:
            card = ComputerChooseCard(player);
            goto PuttingCard;


        WaitHumanChoose:
            player.Game.YourTurn(player.AvailableCards);
            return;
        }


        private void PutCard(Card card, Player currentPlayer)
        {
            foreach (var player in Players)
            {
                player.Game.PutCardOnTheTable(currentPlayer.Id, card);
            }
            Table[card.Suit][card.Index] = true;
            currentPlayer.RemoveCard(card);
        }

        private Card ComputerChooseCard(Player player)
        {
            return null;
        }

        private Player MoveTurnToNextPlayer()
        {
            CurrentPlayer = (CurrentPlayer + 1)%3;
            return Players[CurrentPlayer];
        }

        private bool CanPutCard(Card card)
        {
            return card.Index == 9
                   || card.Index > 6 && Table[card.Suit][card.Index - 1]
                   || card.Index < 14 && Table[card.Suit][card.Index + 1];
        }
        public Player Player(User user)
        {
            return Players.First(a => a.Info == user);
        }
    }
}
