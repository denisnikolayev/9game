using System;
using System.Linq;
using Game.Server.Model.Players;
using Game.Server.Stores;

namespace Game.Server.Model
{
    public class GameContext
    {
        public Guid Id { get; set; }
        public bool[][] Table { get; set; }
        public Player[] Players { get; set; }
        public int BankMoney { get; set; }
        public int CurrentPlayerIndex {get; set;} = 0;

        public Player CurrentPlayer => Players[CurrentPlayerIndex];

        public readonly object _lockObject = new Object();
        private readonly Func<ComputerBrain> _computerBrain;
        private readonly Func<GameResult> _gameResultResolve;
        private readonly IUsersStore _usersStore;

        public GameContext(Player[] players, Guid gameId, Func<ComputerBrain> computerBrain, Func<GameResult> gameResultResolve, IUsersStore usersStore)
        {
            Table = Enumerable.Range(0, 4).Select(suit => new bool[15]).ToArray();
            Id = gameId;
            Players = players;
            _computerBrain = computerBrain;
            _gameResultResolve = gameResultResolve;
            _usersStore = usersStore;
            BankMoney = 150;

            foreach (var p in Players)
            {
                p.Money -= 50;

                p.Lobby.RefreshMoney(p.Money);
                _usersStore.UpdateMoney(p);
            }

            SetFirstPlayer();
        }

        private void SetFirstPlayer()
        {
            var player = Players.First(a => a.Cards.Any(b => b.Suit == 3 && b.Index == 9));
            player.AvailableCards = new[] {new Card {Suit = 3, Index = 9}};

            CurrentPlayerIndex = Array.IndexOf(Players, player);
        }
             


        public void PutCardOnTheTable(Player player, Card card)
        {
            // Implementation of the state machine
            // In this case it is much clearly for understanding
            // https://raw.githubusercontent.com/denisnikolayev/9game/master/Docs/StateMachine.png

            
            if (!player.IsHuman)
            {
                goto ComputerChoosingCard;
            }
            else
            {
                goto PuttingCard;    
            }

        PuttingCard:            
            PutCard(card, player);

            if (player.Cards.Any())
            {
                goto MovingToNextPlayer; 
            }
            else
            {
                goto Finish;
            }

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
            player.Money -= 50;
            BankMoney += 50;

            foreach (var p in Players)
            {
                p.Game.SkipTurn(player.Id, 50);
            }
            _usersStore.UpdateMoney(player);

            goto MovingToNextPlayer;


        ComputerChoosingCard:
            card = _computerBrain().ChooseCard(Table, player);
            goto PuttingCard;


        WaitHumanChoose:
            player.Game.YourTurn(player.AvailableCards);
            return;

        Finish:
            player.Money += BankMoney;

            var gameResult = _gameResultResolve();
            gameResult.BankMoney = BankMoney;
            gameResult.Winner = player;
            gameResult.OtherUsers = Players.Except(new[] { player }).Select(p => p.User).ToArray();

            foreach (var p in Players)
            {
                p.Game.Finish(gameResult);
                p.Lobby.RefreshMoney(p.Money);
                _usersStore.UpdateMoney(p);
            }

            //TODO: Kill game
            
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

        private Player MoveTurnToNextPlayer()
        {
            CurrentPlayerIndex = (CurrentPlayerIndex + 1)%3;
            return Players[CurrentPlayerIndex];
        }

        public bool CanPutCard(Card card)
        {
            return card.Index == 9
                   || card.Index > 6 && Table[card.Suit][card.Index - 1]
                   || card.Index < 14 && Table[card.Suit][card.Index + 1];
        }

        public Player Player(User user)
        {
            return Players.First(a => a.User == user);
        }

        public bool AllCardsHaveBeenPutted
        {
            get
            {
                return !Table.Any(suit => Enumerable.Range(6, 9).Any(index => suit[index] == false)); 
            }
        }

        public bool ValidateStep(Player player, Card card)
        {
            if (!CanPutCard(card))
            {
                return false;
            }

            if (!player.AvailableCards.Contains(card))
            {
                return false;
            }

            return true;
        }
    }
}
