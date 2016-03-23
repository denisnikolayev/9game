import {Card} from "../card";
import {PlayerInfo} from "./playerInfo";

export interface IPlayer {
    removeCard(card: Card): void;    
    info: PlayerInfo;
    id: string;
    money: number;    
}