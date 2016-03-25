import {suits, indexes} from '../model/consts';

export const size = { width: 109 * 0.7, height: 150 * 0.7 };  // change there, change in app.scss
const spaceBetweenCards = { width: 2, height: 4 };

interface Point {
    x: number;
    y: number;
}

export class ImagePositionFinder {
    static inLine(): Point[][] {
        let numberInBackground = +2; //skip 2 jokers (take them from right top corner) 
        const numberOfCardInLine = 9;
        const numberOfAllCards = 13;

        let full: Point[][] = [];

        for (let suit of suits) {
            var line: Point[] = [];

            for (let i = 1; i <= numberOfAllCards; i++) {
                let y = Math.floor(numberInBackground / numberOfCardInLine);
                let x = numberOfCardInLine - (numberInBackground - y * numberOfCardInLine) - 1; // flip to horizontal and move to zero
                line[i] = { x: x, y: y };
                numberInBackground += 1;
            }

            full[suit] = line;
        }

        return full;
    }


    static generateBackgroundPositions(): string[][] {
        let full = [];
        var lines = ImagePositionFinder.inLine();

        for (let suit of suits) {

            let row: string[] = [];
            for (let index of indexes) {
                var card = lines[suit][index == 14 ? 1 : index];
                var left = 1 + (size.width + spaceBetweenCards.width) * card.x;
                var top = 1 + (size.height + spaceBetweenCards.height) * card.y;

                row[index] = `-${left}px -${top}px`;
            }

            full[suit] = row;
        }

        return full;
    }
}