import * as tsUnit from "../external/tsUnit";
import * as Helpers from "./helpers";

export class HelpersTests extends tsUnit.TestClass {
    getRandomShouldNotGoOutFromRange() {
        const min = 5;
        const max = 8;

        var results = Helpers.range(10, 0).map(i=>Helpers.getRandom(min, max));
        
        this.areIdentical(0, results.filter(r=>r<min || r>max).length);
    }    
}