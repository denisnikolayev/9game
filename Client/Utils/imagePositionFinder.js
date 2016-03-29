var consts_1 = require('../model/consts');
exports.size = { width: 109 * 0.8 - 0.5, height: 150 * 0.8 }; // change there, change in app.scss
const spaceBetweenCards = { width: 2, height: 3 };
class ImagePositionFinder {
    static inLine() {
        let numberInBackground = +2; //skip 2 jokers (take them from right top corner) 
        const numberOfCardInLine = 9;
        const numberOfAllCards = 13;
        let full = [];
        for (let suit of consts_1.suits) {
            var line = [];
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
    static generateBackgroundPositions() {
        let full = [];
        var lines = ImagePositionFinder.inLine();
        for (let suit of consts_1.suits) {
            let row = [];
            for (let index of consts_1.indexes) {
                var card = lines[suit][index == 14 ? 1 : index];
                var left = 1 + (exports.size.width + spaceBetweenCards.width) * card.x;
                var top = 1 + (exports.size.height + spaceBetweenCards.height) * card.y;
                row[index] = `-${left}px -${top}px`;
            }
            full[suit] = row;
        }
        return full;
    }
}
exports.ImagePositionFinder = ImagePositionFinder;
//# sourceMappingURL=imagePositionFinder.js.map