import * as tsUnit from "../external/tsUnit";
import {Opponent} from "./opponent";
import {maxNumberOfCard} from "./consts";

export class OpponentTests extends tsUnit.TestClass {

    opponentRemoveCardShouldRemoveCard() {
        var opponent = new Opponent("", 0);
        opponent.removeCard(null);

        this.areIdentical(maxNumberOfCard - 1, opponent.cardsWerePut.filter(status=>status == false).length);
    }

}