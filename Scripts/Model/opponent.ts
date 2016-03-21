import {getRandomItem, range} from "../utils/helpers";
import {maxNumberOfCard} from "./consts";
import {Card} from "./card";
import {IPlayer} from "./iplayer";

export class Opponent implements IPlayer {
    money: number;
    name: string;
    cardsWerePut: boolean[];

    constructor(name: string, money: number) {
        this.name = name;
        this.money = money;
        this.cardsWerePut = range(maxNumberOfCard, false);
    }

    removeCard(card: Card) {
        var indexes = this.cardsWerePut.map((card, index) => { return { card: card, index: index }; }).filter(item => item.card == false);
        var rnd = getRandomItem(indexes);
        this.cardsWerePut[rnd.index] = true;
    }
}