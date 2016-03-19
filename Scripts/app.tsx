import * as React from "react"
import {render} from "react-dom";

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1 style={{ color: "red" }}>Test</h1>
               
            </div>
        );
    }
}

render(<App />, document.getElementById("app"));