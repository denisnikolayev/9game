import {Card} from "./card";
import {suits, indexes, lengthOfLine} from "./consts";
import {Opponent} from "./opponent";
import {Player} from "./player";
import {IPlayer} from "./iplayer";
import {range} from "../utils/helpers";

export enum WhoPlayer {
    current,
    left,
    right
}

export class Game {
    cardsWereOpened: boolean[][]; 
    leftOpponent: Opponent;
    rightOpponent: Opponent;
    player: Player;
    bankMoney: number;
    

    constructor(leftOpponent: Opponent, rightOpponent: Opponent, player : Player, bankMoney : number) {
        this.cardsWereOpened = suits.map(i => range(lengthOfLine, false));
        this.leftOpponent = leftOpponent;
        this.rightOpponent = rightOpponent;
        this.player = player;
        this.bankMoney = bankMoney;
    }

    getPlayerByName(name: string):WhoPlayer {
        if (this.player.name == name) return WhoPlayer.current;
        if (this.leftOpponent.name == name) return WhoPlayer.left;
        if (this.rightOpponent.name == name) return WhoPlayer.right;

        throw `Player name ${name} is unexpected`;
    }

    getPlayer(who: WhoPlayer): IPlayer {
        switch (who) {
            case WhoPlayer.current:
                return this.player;
            case WhoPlayer.left:
                return this.leftOpponent;
            case WhoPlayer.right:
                return this.rightOpponent;
        }

        throw `Player ${who} is unexpected`;
    }

    putCardOnTheTable(card: Card, who: WhoPlayer) {
        this.cardsWereOpened[card.suit][card.index] = true;
        this.getPlayer(who).removeCard(card);
    }

    skipMove(who: WhoPlayer, lostMoney:number) {
        this.getPlayer(who).money -= lostMoney;
        this.bankMoney += lostMoney;
    }

    playerTurn(availibleCards:Card[]) {
        this.player.isMyTurn = true;
        this.player.setAvailibleCard(availibleCards);
    }
}