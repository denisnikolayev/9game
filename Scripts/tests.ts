import * as tsUnit from "./external/tsUnit";
import {ImagePositionFinderTests} from "./utils/imagePositionFinder.test";
import {GameTests} from "./model/game.test";
import {OpponentTests} from "./model/opponent.test";
import {PlayerTests} from "./model/player.test";
import {HelpersTests} from "./utils/helpers.test";

var tests = [
    ImagePositionFinderTests,
    GameTests,
    OpponentTests,
    PlayerTests,
    HelpersTests
];

var tap = new tsUnit.Test(tests).run().getTapResults();

console.log(tap);