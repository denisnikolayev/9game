import * as React from "react"
import {render} from "react-dom";
import {TablePage} from "./table/page";
import * as Model from "./model/game";
import {Card} from "./model/card";
import {suitDiamonds, suitClubs}from "./model/consts";


export class App extends React.Component<{}, { game: Model.Game }> {
    constructor() {
        super();

        var c = (suit, index) => new Card(index, suit);

        var game = new Model.Game(
            new Model.Opponent("Pupusica", 250),
            new Model.Opponent("Zucica", 250),
            new Model.Player(250, [c(suitDiamonds, 6), c(suitDiamonds, 7), c(suitDiamonds, 8), c(suitDiamonds, 9), c(suitDiamonds, 10), c(suitDiamonds, 11), c(suitDiamonds, 12), c(suitDiamonds, 13), c(suitDiamonds, 14), c(suitClubs, 6), c(suitClubs, 7), c(suitClubs, 8)]),
            250
        );        

        this.state = {
            game: game
        };
    }

    onKey(e: React.KeyboardEvent) {
        
        if (e.keyCode == 13) {
            var game = this.state.game;
            var command = (e.target as any).value;
            eval(command);
            this.setState({ game: game });
            return true;
        }
        return false;
    }

    render() {
        return <div>
            <input type="text" style={{ width: "400px" }} onKeyUp={this.onKey.bind(this) } />
            <TablePage game={this.state.game} />
          </div>
    }
}

render(<App />, document.getElementById("app"));