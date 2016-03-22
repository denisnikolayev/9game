import * as React from "react"
import {render} from "react-dom";
import {TablePage} from "./table/page";
import {Game, WhoPlayer} from "./model/game";
import {Card} from "./model/card";
import {suitDiamonds, suitClubs} from "./model/consts";
import {Opponent} from "./model/opponent";
import {Player} from "./model/player";
import * as $ from 'jquery';
import 'ms-signalr-client';



export class App extends React.Component<{}, { game?: Game, name?:string }> {
    proxy: SignalR.Hub.Proxy;

    constructor() {
        super();

        //var c = (suit, index) => new Card(suit, index);        

        //game.playerTurn([c(suitDiamonds, 9), c(suitDiamonds, 11)]);   

        //this.state = {
        //    game: game
        //};

        var connection = $.hubConnection("http://localhost:30155/messaging");
        this.proxy = connection.createHubProxy("Messaging");

        this.proxy.on('LogOnClient', function (message: string) {
            console.log(message);
        });

        this.state = {};

        var self = this;

        this.proxy.on("putCardOnTheTable", function (name:string, card: Card) {
            var game = self.state.game;
            game.putCardOnTheTable(card, game.getPlayerByName(name));
            self.setState({ game: game });
        });

        this.proxy.on("connected", function (name: string) {
            self.setState({ name: name });
        });

        this.proxy.on("gameBegin", function (cards: Card[], money: number, playersNames: string[], avalibleCards:Card[]) {
            var opponets = playersNames.filter(name=> name != self.state.name);
            var game = new Game(
                new Opponent(opponets[0], 250),
                new Opponent(opponets[1], 250),
                new Player(self.state.name, 250, cards),
                250
            ); 
            debugger;
            if (avalibleCards.length > 0) {                
                game.playerTurn(avalibleCards);
            }
            self.setState({ game: game });  
        });

        this.proxy.on("yourTurn", function (cards: Card[]) {            
            var game = self.state.game;
            game.playerTurn(cards);
            self.setState({ game: game });
        });

        this.proxy.on("skipTurn", function (name: string) {
            var game = self.state.game;
            game.skipMove(game.getPlayerByName(name), 5);
            self.setState({ game: game });
        });

        connection.start()
            .done(function () {
                console.log('Now connected, connection ID=' + connection.id);
                self.proxy.invoke("log", "test app");
            })
            .fail(function () { console.log('Could not connect'); });
    }

    onPlayerCardClick(card: Card) {   
        this.proxy.invoke("putCardOnTheTable", card);
        var game = this.state.game;
        game.playerTurn([]);
        this.setState({ game: game });
    }
  
    render() {
        if (this.state.game) {
            return <TablePage game={this.state.game}  onPlayerCardClick={this.onPlayerCardClick.bind(this) } />;
        } else {
            return <div>Ожидаем игроков {this.state.name}</div>;
        }
    }
}

render(<App />, document.getElementById("app"));