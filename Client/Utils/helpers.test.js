var tsUnit = require("../external/tsUnit");
var Helpers = require("./helpers");
class HelpersTests extends tsUnit.TestClass {
    getRandomShouldNotGetOutFromRange() {
        const min = 5;
        const max = 8;
        var results = Helpers.range(10, 0).map(i => Helpers.getRandom(min, max));
        this.areIdentical(0, results.filter(r => r < min || r > max).length);
    }
}
exports.HelpersTests = HelpersTests;
//# sourceMappingURL=helpers.test.js.map