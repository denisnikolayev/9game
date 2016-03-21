import {Card} from "./card";

export interface IPlayer {
    removeCard(card: Card): void;
    money: number;
}