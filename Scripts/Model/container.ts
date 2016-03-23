import {GameContext} from "./gameContext";
import {LobbyContext} from "./lobbyContext";
import {GameResult} from "./gameResult";
import {browserHistory} from 'react-router'

import * as $ from 'jquery';
import 'ms-signalr-client';


export class Container {
    static gameContext: GameContext;
    static lobbyContext: LobbyContext;
    static connection: SignalR.Hub.Connection;

    static ConnectSignalR():Promise<void> {
        return new Promise<void>((r, e) => Container.connection.start().then(r).fail(e));
    }
}

// imitation initializing IoC container
Container.connection = $.hubConnection(SERVER_URL);


Container.gameContext = new GameContext(Container.connection.createHubProxy("Game"));
Container.gameContext.onFinish = (gameResult) => browserHistory.push({pathname: "/result", state:gameResult});


Container.lobbyContext = new LobbyContext(Container.connection.createHubProxy("Lobby"), Container.gameContext);
Container.lobbyContext.onConnected = (gameId)=> browserHistory.push({pathname: "/lobby", query: { gameId : gameId }});
Container.lobbyContext.onGameStart = () => browserHistory.push("/Game");
