var helpers_1 = require("../../utils/helpers");
var consts_1 = require("../consts");
class Opponent {
    constructor(info) {
        this.info = info;
        this.cardsWerePut = helpers_1.range(consts_1.maxNumberOfCard, false);
    }
    get id() {
        return this.info.id;
    }
    get money() {
        return this.info.money;
    }
    set money(value) {
        this.info.money = value;
    }
    removeCard(card) {
        var indexes = this.cardsWerePut.map((card, index) => { return { card: card, index: index }; }).filter(item => item.card == false);
        var rnd = helpers_1.getRandomItem(indexes);
        this.cardsWerePut[rnd.index] = true;
    }
}
exports.Opponent = Opponent;
//# sourceMappingURL=opponent.js.map