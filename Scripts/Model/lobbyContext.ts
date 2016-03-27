import 'ms-signalr-client';
import {User} from "./players/user";
import {Card} from "./card";
import {GameContext} from "./gameContext";
import {subscribe} from "../utils/helpers";
import {Player} from "./players/player";

export class LobbyContext {
    
    onGameStart: () => void;
    onChange: () => void;    
    onConnected: (gameId:string)=>void;
    

    currentPlayer: User;    
    connectedPlayers: User[];

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
   

    serverRegistered(user: User) {  
        this.onRegisteredResolve();
        this.currentPlayer = user;
        this.onChange();
    }

    serverConnected(gameId: string, players: User[]) {        
        this.connectedPlayers = players;
        this.gameId = gameId;
        this.onConnected(gameId);
    } 

    serverPlayerConnected(player: User) {
        this.connectedPlayers.push(player);
        this.onChange();
    }

    serverGameStart(players: User[], bankMoney: number, yourCards: Card[], avaliableCards: Card[]) {       
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

    addComputer() {
        this.lobbyServer.invoke("AddComputer", this.gameId);
    }

    checkGameId(gameId:string) {
        if (gameId != this.gameId){            
            this.gameId = gameId;
            this.lobbyServer.invoke("ConnectToGame", gameId);
        }
    }
}