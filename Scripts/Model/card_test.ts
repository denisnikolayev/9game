import * as tsUnit from "../external/tsUnit";
import * as cardUnit from "./Card";

export class ImagePositionFinderTests extends tsUnit.TestClass {
    inLineShouldReturnCorrectResult() {
        var result = cardUnit.ImagePositionFinder.inLine();

        this.areIdentical(4, result.length);
        this.areIdentical(undefined, result[0][0]);
        
        this.areIdentical(14, result[0].length);
        this.areIdentical(14, result[1].length);
        this.areIdentical(14, result[2].length);
        this.areIdentical(14, result[3].length);
        this.areIdentical(4, result[cardUnit.suitHeats][8].x);
        this.areIdentical(2, result[cardUnit.suitHeats][8].y);

        this.areIdentical(8, result[cardUnit.suitDiamonds][5].x);
        this.areIdentical(5, result[cardUnit.suitDiamonds][5].y);
    }

    generateSetOfCardsShouldReturnCorrectResult() {
        var result = cardUnit.ImagePositionFinder.generateSetOfCards();
        console.log(result);

    }
}

    