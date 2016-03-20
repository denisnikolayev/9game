import * as React from "react"
import {render} from "react-dom";
import {Card, cardsBackgroundsCache} from "./model/card";
import {suits, indexes, size} from "./model/consts";

export class App extends React.Component<{}, {}> {
    render() {       

        var card = (suit: number, index: number) =>
            <div style={{ background: "url('/Images/Cards.jpg')  no-repeat", backgroundPosition: cardsBackgroundsCache[suit][index] }} className="card"></div>
        ;

        var list = suits.map(suit=><div>
                {indexes.map(index=> card(suit, index))}
            </div>);

        return (
            <div>
                <h1 style={{ color: "red" }}>Test</h1>
                <div style={{ marginLeft: "auto", marginRight: "auto", width: (10 * size.width) + "px" }}>
                    {list}
                </div>   
                <div className="back"></div>           
            </div>
        );
    }
}

render(<App />, document.getElementById("app"));