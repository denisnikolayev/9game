import {Card} from "./card";
import {suits, indexes, lengthOfLine} from "./consts";
import {range, subscribe, unsubscribe} from "../utils/helpers";
import 'ms-signalr-client';
import {GameResult} from "./gameResult";

import {Opponent} from "./players/opponent";
import {Player} from "./players/player";
import {IPlayer} from "./players/iplayer";
import {PlayerInfo} from "./players/playerInfo";

export class GameContext {
    cardsWereOpened: boolean[][];

    leftOpponent: Opponent;
    rightOpponent: Opponent;
    player: Player;
    
    bankMoney: number;

    private server: SignalR.Hub.Proxy;
    private players: { [id: string]: IPlayer };

    onChange: () => void;
    onFinish: (gameResult: GameResult) => void;

    constructor(server: SignalR.Hub.Proxy) {
        this.onChange = () => { };
        this.onFinish = (gameResult) => { };

        this.server = server;
        subscribe(this, this.server);
    }

    beginGame(players: PlayerInfo[], bankMoney: number, player: Player) {
        this.cardsWereOpened = suits.map(i => range(lengthOfLine, false));

        this.player = player;

        this.setCorrectOpponents(players);
        this.createPlayersCache();

        this.bankMoney = bankMoney;
      
        this.onChange();
    }  
    

    serverPutCardOnTheTable(playerId:string, card: Card) {
        this.cardsWereOpened[card.suit][card.index] = true;
        this.players[playerId].removeCard(card);
        this.onChange();
    }

    serverSkipTurn(playerId, lostMoney:number) {
        this.players[playerId].money -= lostMoney;
        this.bankMoney += lostMoney;
        this.onChange();
    }

    serverYourTurn(availibleCards:Card[]) {        
        this.player.setAvailibleCard(availibleCards);
        this.onChange();
    }

    serverDisconnect(playerId, newPlayerInfo: PlayerInfo) {
        this.players[playerId].info = newPlayerInfo;
        this.onChange();
    }

    serverFinish(gameResult:GameResult) {        
        this.onFinish(gameResult);
    }

    putCardOnTheTable(card: Card) {
        this.player.setAvailibleCard([]);
        this.onChange();
        this.server.invoke("putCardOnTheTable", card);
    }


    private setCorrectOpponents(players: PlayerInfo[]) {
        var ourIndex = players.findIndex(p=> p.id == this.player.id);
        this.leftOpponent = new Opponent(players[(ourIndex + 1) % players.length]);
        this.rightOpponent = new Opponent(players[(ourIndex + 2) % players.length]);
    }

    private createPlayersCache() {
        this.players = {};
        this.players[this.leftOpponent.id] = this.leftOpponent;
        this.players[this.rightOpponent.id] = this.rightOpponent;
        this.players[this.player.id] = this.player;
    }
}