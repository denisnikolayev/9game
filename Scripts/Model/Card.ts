// much esear to use just const instead of enum
export const suitSpades = 0;
export const suitHeats = 1;
export const suitClubs = 2;
export const suitDiamonds = 3;


export class Card {
    index: number;
    suit: number;
    background: {
        top: number;
        left:number;
    }

    constructor(index, suit, background) {
        this.index = index;
        this.suit = suit;
        this.background = background;
    }
}


export const indexes = [6, 7, 8, 9, 10, 11, 12, 13, 14];
export const suits = [suitSpades, suitHeats, suitClubs, suitDiamonds];

export const size = { width: 110, height: 152};



export class ImagePositionFinder {
    static inLine(): {x:number,y:number}[][] {
        let numberInBackground = +2; //skip 2 jokers (take them from right top corner) 
        const numberOfCardInLine = 9;

        let full: { x: number, y: number }[][] = [];

        for (let suit of suits) {
            var line: { x: number, y: number }[] = [];

            for (let i = 1; i <= 13; i++) {
                let y = Math.floor(numberInBackground / numberOfCardInLine);
                let x = numberOfCardInLine - (numberInBackground - y * numberOfCardInLine) - 1; // invert by horz and move to zero
                line[i] = { x: x, y: y };
                numberInBackground += 1;
            }

            full[suit] = line;
        }

        return full;
    }


    static generateSetOfCards(): Card[][] {
        let full = [];
        for (let suit of suits) {

            let row: Card[] = [];
            for (let index of indexes) {
                row[index] = new Card(index, suit, { top: 1, left: 1 });
            }

            full[suit] = row;
        }

        return full;
    }
}




export let setOfCards: Card[][] = ImagePositionFinder.generateSetOfCards();


