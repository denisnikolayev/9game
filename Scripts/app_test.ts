import * as tsUnit from "./external/tsUnit";
import {ImagePositionFinderTests} from "./Utils/imagePositionFinder.test";

var tap = new tsUnit.Test([ImagePositionFinderTests]).run().getTapResults();

console.log(tap);