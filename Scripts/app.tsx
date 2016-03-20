import * as React from "react"
import {render} from "react-dom";
import {TablePage} from "./table/page"

export class App extends React.Component<{}, {}> {
    render() {       
        return <TablePage />
    }
}

render(<App />, document.getElementById("app"));