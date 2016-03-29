import {Card} from "../card";
import {IPlayer} from "./iplayer";
import {User} from "./user";

export class Player implements IPlayer {
    info: User;    
    cards: Card[];   
    availibleCards:{[id:string]:boolean};   

    get id():string {
        return this.info.id;
    }

    get money(): number {
        return this.info.money;
    }
    set money(value: number) {
        this.info.money = value;
    }

    constructor(info: User, cards: Card[], availibleCards:Card[]) {      
        this.cards = cards;       
        this.info = info;
        this.setAvailibleCard(availibleCards);
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