import * as tsUnit from "./external/tsUnit";
import {ImagePositionFinderTests} from "./utils/imagePositionFinder.test";
import {GameTests} from "./model/game.test";

var tests = [
    ImagePositionFinderTests,
    GameTests
];

var tap = new tsUnit.Test(tests).run().getTapResults();

console.log(tap);