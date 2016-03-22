import * as React from "react"
import {render} from "react-dom";
import {TablePage} from "./table/page";
import {Game, WhoPlayer} from "./model/game";
import {Card} from "./model/card";
import {suitDiamonds, suitClubs} from "./model/consts";
import {Opponent} from "./model/opponent";
import {Player} from "./model/player";
import * as $ from 'jquery';

// for signalR
(window as any).jQuery = $; 

import 'ms-signalr-client';



export class App extends React.Component<{}, { game: Game }> {
    constructor() {
        super();

        var c = (suit, index) => new Card(suit, index);

        var game = new Game(
            new Opponent("Pupusica", 250),
            new Opponent("Zucica", 250),
            new Player(250, [c(suitDiamonds, 6), c(suitDiamonds, 7), c(suitDiamonds, 8), c(suitDiamonds, 9), c(suitDiamonds, 10), c(suitDiamonds, 11), c(suitDiamonds, 12), c(suitDiamonds, 13), c(suitDiamonds, 14), c(suitClubs, 6), c(suitClubs, 7), c(suitClubs, 8)]),
            250
        );   

        game.playerTurn([c(suitDiamonds, 9), c(suitDiamonds, 11)]);   

        this.state = {
            game: game
        };

        var connection = $.hubConnection("http://localhost:30155/messaging");
        var proxy = connection.createHubProxy("Messaging");

        proxy.on('LogOnClient', function (message: string) {
            console.log(message);
        });

        connection.start()
            .done(function () {
                console.log('Now connected, connection ID=' + connection.id);
                proxy.invoke("log", "test app");
            })
            .fail(function () { console.log('Could not connect'); });
    }

    onPlayerCardClick(card: Card) {   
        var game = this.state.game;
        game.putCardOnTheTable(card, WhoPlayer.current);
        this.setState({ game: game });
    }
  
    render() {
        return <TablePage game={this.state.game}  onPlayerCardClick={this.onPlayerCardClick.bind(this) } />;          
    }
}

render(<App />, document.getElementById("app"));