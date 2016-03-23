import 'ms-signalr-client';
import {PlayerInfo} from "./players/playerInfo";
import {Card} from "./card";
import {GameContext} from "./gameContext";
import {subscribe, unsubscribe, getRandom} from "../utils/helpers";
import {Player} from "./players/player";

export class LobbyContext {
    
    onGameStart: () => void;
    onChange: () => void;    

    currentPlayer: PlayerInfo;

    private lobbyServer: SignalR.Hub.Proxy
    private gameContext: GameContext;

    constructor(lobbyServer: SignalR.Hub.Proxy, gameContext:GameContext) {
        this.lobbyServer = lobbyServer;
        this.onGameStart = () => { };
        this.gameContext = gameContext;

        subscribe(this, this.lobbyServer);          
    }   

    registerUser() {
        this.lobbyServer.invoke("RegisterUser", getRandom(0, 10000));        
    }  

    serverRegistered(playerInfo: PlayerInfo) {  
        this.currentPlayer = playerInfo;
        this.onChange();
    }

    serverConnected(gameId: string) {
        
    } 

    serverPlayerConnected(player: PlayerInfo) {

    }

    serverMessage(message: string) {
        console.log(message);
    }

    serverGameStart(players: PlayerInfo[], bankMoney: number, yourCards: Card[], avaliableCards: Card[]) {       
        var player = new Player(this.currentPlayer, yourCards, avaliableCards);
        this.gameContext.beginGame(players, bankMoney, player);     
        this.onGameStart();
    }
}