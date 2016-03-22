import {Card} from "./card";
import {IPlayer} from "./iplayer";

export class Player implements IPlayer {
    money: number;
    cards: Card[];
    isMyTurn: boolean = false;
    availibleCards:{[id:string]:boolean};
    name: string;

    constructor(name:string, money: number, cards: Card[]) {
        this.money = money;
        this.cards = cards;
        this.name = name;
        this.availibleCards = {};
    }

    removeCard(card: Card) {
        var find = this.cards.filter(item => item.index == card.index && item.suit == card.suit);
        if (find.length == 1) {
            var index = this.cards.indexOf(find[0]);
            this.cards.splice(index, 1);
        } else {
            throw `Cann't find card ${Card.toString(card)} to current player`;
        }
    }

    setAvailibleCard(cards: Card[]) {
        this.availibleCards = {};
        for (var card of cards) {
            this.availibleCards[Card.toString(card)] = true;
        }
    }

    isCardCanBePut(card: Card) {
        return this.availibleCards[Card.toString(card)] === true;
    }
}