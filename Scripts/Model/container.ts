import {GameContext} from "./gameContext";
import {LobbyContext} from "./lobbyContext";
import {GameResult} from "./gameResult";
import {browserHistory} from 'react-router'
import {PlayerInfo} from "./players/playerInfo";
import {Player} from "./players/player";

import * as $ from 'jquery';
import 'ms-signalr-client';

export class Container {
    static gameContext: GameContext;
    static lobbyContext: LobbyContext;
    static connection: SignalR.Hub.Connection;

    static Start():Promise<void> {
        return new Promise<void>((r, e) => Container.connection.start().then(r).fail(e));
    }
}

// imitation initializing IoC container

Container.connection = $.hubConnection("http://localhost:30155");


Container.gameContext = new GameContext(Container.connection.createHubProxy("Game"));
Container.gameContext.onFinish = (gameResult) => {
    
    //Container.gameResult = gameResult;
    //this.setState({ gameResult: gameResult, page: "gameResult" });
}


Container.lobbyContext = new LobbyContext(Container.connection.createHubProxy("Lobby"), Container.gameContext);
Container.lobbyContext.onConnected = (gameId)=> browserHistory.push({pathname: "/lobby", query: { gameId : gameId }});
Container.lobbyContext.onGameStart = () => browserHistory.push("/Game");
