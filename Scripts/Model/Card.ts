import {ImagePositionFinder} from '../utils/imagePositionFinder';

export const cardsBackgroundsCache = ImagePositionFinder.generateBackgroundPositions();

export class Card {
    suit: number;
    index: number;
    

    constructor(suit:number, index:number) {
        this.index = index;
        this.suit = suit;
    }

    static toString(card:Card): string {
        return `${card.suit} x ${card.index}`;
    }
}