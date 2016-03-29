var imagePositionFinder_1 = require('../utils/imagePositionFinder');
exports.cardsBackgroundsCache = imagePositionFinder_1.ImagePositionFinder.generateBackgroundPositions();
class Card {
    constructor(suit, index) {
        this.index = index;
        this.suit = suit;
    }
    static toString(card) {
        return `${card.suit} x ${card.index}`;
    }
}
exports.Card = Card;
//# sourceMappingURL=Card.js.map