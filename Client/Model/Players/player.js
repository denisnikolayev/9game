var card_1 = require("../card");
class Player {
    constructor(info, cards, availibleCards) {
        this.cards = cards;
        this.info = info;
        this.setAvailibleCard(availibleCards);
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
        var find = this.cards.filter(item => item.index == card.index && item.suit == card.suit);
        if (find.length == 1) {
            var index = this.cards.indexOf(find[0]);
            this.cards.splice(index, 1);
        }
        else {
            throw `Cann't find card ${card_1.Card.toString(card)} to current player`;
        }
    }
    setAvailibleCard(cards) {
        this.availibleCards = {};
        for (var card of cards) {
            this.availibleCards[card_1.Card.toString(card)] = true;
        }
    }
    isCardCanBePut(card) {
        return this.availibleCards[card_1.Card.toString(card)] === true;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map