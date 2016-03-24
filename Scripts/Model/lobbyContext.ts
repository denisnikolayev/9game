import 'ms-signalr-client';
import {PlayerInfo} from "./players/playerInfo";
import {Card} from "./card";
import {GameContext} from "./gameContext";
import {subscribe, unsubscribe, getRandom} from "../utils/helpers";
import {Player} from "./players/player";

export class LobbyContext {
    
    onGameStart: () => void;
    onChange: () => void;    
    onConnected: (gameId:string)=>void;
    

    currentPlayer: PlayerInfo;    
    connectedPlayers: PlayerInfo[];

    private gameId:string;
    private lobbyServer: SignalR.Hub.Proxy
    private gameContext: GameContext;
    private onRegisteredResolve: ()=>void;


    constructor(lobbyServer: SignalR.Hub.Proxy, gameContext: GameContext) {
        this.lobbyServer = lobbyServer;
        this.onGameStart = () => { };
        this.onChange = () => { };
        this.gameContext = gameContext;
        this.connectedPlayers = [];

        subscribe(this, this.lobbyServer);          
    }      
   

    serverRegistered(playerInfo: PlayerInfo) {  
        this.onRegisteredResolve();
        this.currentPlayer = playerInfo;
        this.onChange();
    }

    serverConnected(gameId: string, players: PlayerInfo[]) {        
        this.connectedPlayers = players;
        this.gameId = gameId;
        this.onConnected(gameId);
    } 

    serverPlayersConnected(players: PlayerInfo[]) {
        for (var player of players) this.connectedPlayers.push(player);
        this.onChange();
    }

    serverGameStart(players: PlayerInfo[], bankMoney: number, yourCards: Card[], avaliableCards: Card[]) {       
        var player = new Player(this.currentPlayer, yourCards, avaliableCards);
        this.gameContext.beginGame(players, bankMoney, player);     
        this.onGameStart();
    }


    registerUser(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.onRegisteredResolve = resolve;
            this.lobbyServer.invoke("RegisterUser", getRandom(0, 10000));
        });
    }  

    connectToRandomGame() {        
        this.connectedPlayers = [];
        this.lobbyServer.invoke("ConnectToRandomGame");
    }

    checkGameId(gameId:string) {
        if (gameId != this.gameId){
            // change
            
            this.lobbyServer.invoke("ConnectToRandomGame");
        }
    }
}