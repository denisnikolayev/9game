import * as React from "react"
import {render} from "react-dom";
import * as Cards from "./model/card";

export class App extends React.Component<{}, {}> {
    render() {
        
        return (
            <div>
                <h1 style={{ color: "red" }}>Test</h1>
                <div style={{ width: "110px", height: "152px", background: "url('/Images/Cards.jpg') -2px -2px no-repeat" }}></div>
                <div style={{ width: "110px", height: "152px", background: "url('/Images/Cards.jpg') -113px -2px no-repeat" }}></div>
                <div style={{ width: "110px", height: "152px", background: "url('/Images/Cards.jpg') -2px -156px no-repeat" }}></div>
            </div>
        );
    }
}

render(<App />, document.getElementById("app"));