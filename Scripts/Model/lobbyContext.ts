import 'ms-signalr-client';
import {PlayerInfo} from "./players/playerInfo";
import {Card} from "./card";
import {GameContext} from "./gameContext";
import {subscribe} from "../utils/helpers";
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

    serverPlayerConnected(player: PlayerInfo) {
        this.connectedPlayers.push(player);
        this.onChange();
    }

    serverGameStart(players: PlayerInfo[], bankMoney: number, yourCards: Card[], avaliableCards: Card[]) {       
        var player = new Player(this.currentPlayer, yourCards, avaliableCards || []);
        this.gameContext.beginGame(this.gameId, players, bankMoney, player);     
        this.onGameStart();
    }

    serverRefreshMoney(money: number) {
        this.currentPlayer.money = money;
        this.onChange();
    }

    registerUser(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.onRegisteredResolve = resolve;
            this.lobbyServer.invoke("RegisterUser");
        });
    }  

    connectToRandomGame() {
        this.lobbyServer.invoke("ConnectToRandomGame");
    }

    createFriendGame() {
        this.lobbyServer.invoke("CreateFriendGame");
    }

    playWithComputer() {
        this.lobbyServer.invoke("PlayWithComputer");
    }

    checkGameId(gameId:string) {
        if (gameId != this.gameId){            
            this.gameId = gameId;
            this.lobbyServer.invoke("ConnectToGame", gameId);
        }
    }
}