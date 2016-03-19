import * as React from "react"
import {render} from "react-dom";
import * as CardUnit from "./model/card";

export class App extends React.Component<{}, {}> {
    render() {
        var list = [];
        for (let suit of CardUnit.suits) {
            for (let index of CardUnit.indexes) {
                list.push(<div style={{ width: CardUnit.size.width + "px", height: CardUnit.size.height + "px", background: "url('/Images/Cards.jpg')  no-repeat", backgroundPosition: CardUnit.setOfCards[suit][index].backgroundPosition, display: "inline-block", border:"1px solid black" }}></div>);
            }
        }

        return (
            <div>
                <h1 style={{ color: "red" }}>Test</h1>
                {list}                
            </div>
        );
    }
}

render(<App />, document.getElementById("app"));

/*<div style={{ width: "110px", height: "152px", background: "url('/Images/Cards.jpg') -113px -2px no-repeat", display: "inline-block" }}></div>
                <div style={{ width: "110px", height: "152px", background: "url('/Images/Cards.jpg') -2px -156px no-repeat", display: "inline-block" }}></div>*/