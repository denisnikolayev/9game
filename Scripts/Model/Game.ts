import {Card} from "./card";
import {suits, indexes, lengthOfLine, maxNumberOfCard} from "./consts";
import {getRandomItem} from "../utils/helpers";
 

enum WhoPlayer {
    current,
    left,
    right
}

interface IPlayer {
    removeCard(card: Card): void;
    money:number;
}

export class Opponent implements IPlayer{
    money: number;
    name: string;
    cardsWerePut: boolean[]; 

    constructor(name: string, money: number) {
        this.name = name;
        this.money = money;
        this.cardsWerePut = [...new Array(maxNumberOfCard).keys()].map(i=> false);
    }

    removeCard(card: Card) {
        var indexes = this.cardsWerePut.map((card, index) => { return { card: card, index: index }; }).filter(item => item.card == false);
        var rnd = getRandomItem(indexes);
        this.cardsWerePut[rnd.index] = true;
    }
}

export class Player implements IPlayer{
    money: number;
    cards: Card[];
    isMyTurn: boolean = false;
    
    constructor(money: number, cards: Card[]) {
        this.money = money;
        this.cards = cards;
    }

    removeCard(card:Card) {
        var find = this.cards.filter(item => item.index == card.index && item.suit == card.suit);
        if (find.length == 1) {
            var index = this.cards.indexOf(find[0]);
            this.cards.splice(index, 1);
        } else {
            throw `Cann't find card ${card.toString()} to current player`;
        }
    }
}

export class Game {
    cardsWereOpened: boolean[][]; 
    leftOpponent: Opponent;
    rightOpponent: Opponent;
    player: Player;
    bankMoney: number;


    constructor(leftOpponent: Opponent, rightOpponent: Opponent, player : Player, bankMoney : number) {
        this.cardsWereOpened = suits.map(i => [...new Array(lengthOfLine).keys()].map(i => false));
        this.leftOpponent = leftOpponent;
        this.rightOpponent = rightOpponent;
        this.player = player;
        this.bankMoney = bankMoney;
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

    playerTurn() {
        this.player.isMyTurn = true;
    }
}