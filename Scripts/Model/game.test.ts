import * as tsUnit from "../external/tsUnit";
import {Game, WhoPlayer} from "./game";
import {Player} from "./player";
import {Opponent} from "./opponent";
import {Card} from "./card";
import {suitHeats, maxNumberOfCard} from "./consts";

const baseAmounOfMoney = 50;

export class GameTests extends tsUnit.TestClass {

    player = new Player("", 0, [new Card(suitHeats, 7), new Card(suitHeats, 8)]);
    opponentLeft = new Opponent("", baseAmounOfMoney);
    opponentRight = new Opponent("", baseAmounOfMoney);
    game = new Game(this.opponentLeft, this.opponentRight, this.player, baseAmounOfMoney);
 

    getPlayerShouldReturnCorrectPlayer() {
        var resultPlayer = this.game.getPlayer(WhoPlayer.current);
        var resultOpponent = this.game.getPlayer(WhoPlayer.left);

        this.isTrue(this.player == resultPlayer, "Returned correct player");
        this.isTrue(this.opponentLeft == resultOpponent, "Returned correct opponent");
    }

    putCardOnTheTableShouldChangeTheTableAndLeftPlayer() {
        var card = new Card(suitHeats, 6);
        this.game.putCardOnTheTable(card, WhoPlayer.left);

        this.areIdentical(true, this.game.cardsWereOpened[card.suit][card.index]);
        this.areIdentical(false, this.game.cardsWereOpened[card.suit][7]);
        this.areIdentical(maxNumberOfCard - 1, this.opponentLeft.cardsWerePut.filter(status=>status == false).length);
    }

    skipMoveShouldChangeMoneyBothBankAndPlayer() {
        const lostMoney = 5;

        this.game.skipMove(WhoPlayer.left, lostMoney);

        this.areIdentical(baseAmounOfMoney - lostMoney, this.game.leftOpponent.money);
        this.areIdentical(baseAmounOfMoney + lostMoney, this.game.bankMoney);
        this.areIdentical(baseAmounOfMoney, this.game.rightOpponent.money);
    }

    playerTurnShouldCorrectChangeAvaliableCards() {
        var card = new Card(suitHeats, 7);

        this.game.playerTurn([card]);

        this.areIdentical(true, this.game.player.isMyTurn);
        this.areIdentical(true, this.game.player.isCardCanBePut(card));
        this.areIdentical(false, this.game.player.isCardCanBePut(new Card(suitHeats, 6)));
    }
}