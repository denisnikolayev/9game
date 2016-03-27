import {Card} from "../card";
import {User} from "./user";

export interface IPlayer {
    removeCard(card: Card): void;    
    info: User;
    id: string;
    money: number;    
}