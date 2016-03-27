import {User} from "./players/user";

export class GameResult {
    public winner : User;
    public otherUsers: User[];
    public bankMoney: number;
}