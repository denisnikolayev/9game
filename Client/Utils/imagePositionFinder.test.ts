import * as tsUnit from "../external/tsUnit";
import {ImagePositionFinder} from './imagePositionFinder';
import * as consts from '../model/consts';

export class ImagePositionFinderTests extends tsUnit.TestClass {

    inLineShouldReturnCorrectResult() {
        var result = ImagePositionFinder.inLine();

        this.areIdentical(4, result.length);
        this.areIdentical(undefined, result[0][0]);
        
        this.areIdentical(14, result[0].length);
        this.areIdentical(14, result[1].length);
        this.areIdentical(14, result[2].length);
        this.areIdentical(14, result[3].length);
        this.areIdentical(4, result[consts.suitHeats][8].x);
        this.areIdentical(2, result[consts.suitHeats][8].y);

        this.areIdentical(8, result[consts.suitDiamonds][5].x);
        this.areIdentical(5, result[consts.suitDiamonds][5].y);
    }

    generateBackgroundPositionsShouldReturnCorrectResult() {
        var result = ImagePositionFinder.generateBackgroundPositions();
        this.areIdentical(4, result.length);
        this.areIdentical(15, result[0].length);
    }

}

    