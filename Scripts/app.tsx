﻿import * as React from "react"
import {render} from "react-dom";

import {GamePage} from "./pages/gamePage";
import {LobbyPage} from "./pages/lobbyPage";
import {GameResultPage} from "./pages/gameResultPage";

import {Container} from "./model/container";
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

export class Layout extends React.Component<{children:any}, {}> {      
    render() {
        return <div>{this.props.children}</div>
    }
}


(async function() {
    let appNode = document.getElementById("app");

    render(<div>Loading</div>, appNode);

    try {
        await Container.Start();
        await Container.lobbyContext.registerUser();

        render(
            <Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={LobbyPage}/>
                    <Route path="lobby" component={LobbyPage}/>
                    <Route path="game" component={GamePage} />
                    <Route path="result" component={GameResultPage}/>
                </Route>
            </Router>
            , appNode);

    } catch (e) {
        console.log(e);
        render(<div>Could not connect to server: <br/>{e.toString()}</div>, appNode);
    }
})();