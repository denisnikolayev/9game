import {getRandomItem, range} from "../../utils/helpers";
import {maxNumberOfCard} from "../consts";
import {Card} from "../card";
import {IPlayer} from "./iplayer";
import {PlayerInfo} from "./playerInfo";

export class Opponent implements IPlayer {   
    info: PlayerInfo;
    cardsWerePut: boolean[];

    get id(): string {
        return this.info.id;
    }
    get money(): number {
        return this.info.money;
    }
    set money(value: number) {
        this.info.money = value;
    }

    constructor(info:PlayerInfo) {
        this.info = info;       
        this.cardsWerePut = range(maxNumberOfCard, false);
    }

    removeCard(card: Card) {
        var indexes = this.cardsWerePut.map((card, index) => { return { card: card, index: index }; }).filter(item => item.card == false);
        var rnd = getRandomItem(indexes);
        this.cardsWerePut[rnd.index] = true;
    }
}