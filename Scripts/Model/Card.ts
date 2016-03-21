import {ImagePositionFinder} from '../utils/imagePositionFinder';

export const cardsBackgroundsCache = ImagePositionFinder.generateBackgroundPositions();

export class Card {
    index: number;
    suit: number;

    constructor(index, suit) {
        this.index = index;
        this.suit = suit;
    }

    toString(): string {
        return `${this.suit} x ${this.index}`;
    }
}