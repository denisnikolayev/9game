import * as React from "react"
import {render} from "react-dom";
import {GamePage} from "./pages/gamePage";
import {GameContext} from "./model/gameContext";
import {LobbyPage} from "./pages/lobbyPage";
import {LobbyContext} from "./model/lobbyContext";
import {GameResultPage} from "./pages/gameResultPage";
import {GameResult} from "./model/gameResult";
import * as $ from 'jquery';
import 'ms-signalr-client';
import {getRandom} from './utils/helpers';

import {PlayerInfo} from "./model/players/playerInfo";

export class App extends React.Component<{}, { gameContext?: GameContext, lobbyContext?: LobbyContext, gameResult?: GameResult, currentPlayer?:PlayerInfo, page?:string }> {
    gameServer: SignalR.Hub.Proxy;   
    lobbyServer: SignalR.Hub.Proxy;   
    

    constructor() {
        super(); 
       
        var connection = $.hubConnection("http://localhost:30155");


        var gameContext = new GameContext(connection.createHubProxy("Game"));
        gameContext.onChange = () => this.setState({ gameContext: this.state.gameContext });
        gameContext.onFinish = (gameResult) => this.setState({ gameResult: gameResult, page: "gameResult" });


        var lobbyContext = new LobbyContext(connection.createHubProxy("Lobby"), gameContext);
        lobbyContext.onChange = () => this.setState({ lobbyContext: this.state.lobbyContext });       
        lobbyContext.onGameStart = () => this.setState({ page: "game" });        

       
        this.state = {
            lobbyContext: lobbyContext,
            gameContext: gameContext,
            page : "lobby"
        };

        connection.start()
            .done(() => this.state.lobbyContext.registerUser())
            .fail(function () { alert('Could not connect to server'); });
    }    
   
  
    render() {
        switch (this.state.page) {
            case "lobby": return <LobbyPage lobbyContext={this.state.lobbyContext} />;
            case "game": return <GamePage gameContext={this.state.gameContext} />;
            case "gameResult": <GameResultPage gameResult={this.state.gameResult} onLobby={() => this.setState({ page: "lobby" })} /> 
        }       

        return <div>Connecting..</div>;
    }
}

render(<App />, document.getElementById("app"));