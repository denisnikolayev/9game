//import * as tsUnit from "../external/tsUnit";
//import {Player} from "./player";
//import {suitHeats} from "./consts"
//import {Card} from "./card";
//const card1 = new Card(suitHeats, 6);
//const card2 = new Card(suitHeats, 7);
//export class PlayerTests extends tsUnit.TestClass {
//    player = new Player("", 0, [card1, card2]);
//    playerRemoveCardShouldRemoveCorrectCard() {
//        this.player.removeCard(card1);
//        this.areIdentical(0, this.player.cards.filter(card=> card.toString() == card1.toString()).length);
//        this.areIdentical(1, this.player.cards.filter(card=> card.toString() == card2.toString()).length);
//        this.areIdentical(1, this.player.cards.length);
//    }
//    playerSetAvailibleCardShouldReturnTrue() {
//        this.player.setAvailibleCard([card1]);
//        this.areIdentical(true, this.player.isCardCanBePut(card1));
//        this.areIdentical(false, this.player.isCardCanBePut(card2));
//    }
//} 
//# sourceMappingURL=player.test.js.map