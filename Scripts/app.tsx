import * as React from "react"
import {render} from "react-dom";
import * as CardUnit from "./model/card";

export class App extends React.Component<{}, {}> {
    render() {       

        var card = (suit: number, index: number) =>
            <div style={{ margin: "2px", width: CardUnit.size.width + "px", height: CardUnit.size.height + "px", background: "url('/Images/Cards.jpg')  no-repeat", backgroundPosition: CardUnit.setOfCards[suit][index].backgroundPosition, display: "inline-block", border: "1px solid black", borderRadius: "4px" }}></div>
        ;

        var list = CardUnit.suits.map(suit=><div>
                {CardUnit.indexes.map(index=> card(suit, index))}
            </div>);

        return (
            <div>
                <h1 style={{ color: "red" }}>Test</h1>
                <div style={{ marginLeft: "auto", marginRight: "auto", width: (10 * CardUnit.size.width) + "px" }}>
                    {list}
                </div>   
                <div style={{ width: CardUnit.size.width + "px", height: CardUnit.size.height + "px", background: "url('/Images/Suit.png') center no-repeat", display: "inline-block", border: "1px solid black", borderRadius: "4px" }}></div>           
            </div>
        );
    }
}

render(<App />, document.getElementById("app"));

/*<div style={{ width: "110px", height: "152px", background: "url('/Images/Cards.jpg') -113px -2px no-repeat", display: "inline-block" }}></div>
                <div style={{ width: "110px", height: "152px", background: "url('/Images/Cards.jpg') -2px -156px no-repeat", display: "inline-block" }}></div>*/