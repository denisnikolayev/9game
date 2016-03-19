import * as tsUnit from "./external/tsUnit";
import {ImagePositionFinderTests} from "./model/card_test";

var tap = new tsUnit.Test([ImagePositionFinderTests]).run().getTapResults();

console.log(tap);