import {PlayerInfo} from "./players/playerInfo";

export class GameResult {
    public winner : PlayerInfo;
    public otherUsers: PlayerInfo[];
    public bankMoney: number;
}