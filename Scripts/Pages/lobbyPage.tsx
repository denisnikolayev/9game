import * as React from "react";
import {LobbyContext} from "../model/lobbyContext";

export class LobbyPage extends React.Component<{ lobbyContext: LobbyContext }, { current: () => JSX.Element }> {
    constructor() {
        super();
        this.state = { current: this.stateChooseGame };
    }

    stateChooseGame() {
        return <div>
                    <button>ConnectToRandomGame</button>
                    <button>CreateFriendGame</button>
                    <button>PlayWithComputer</button>
            </div>;
    }

    stateWaitGamers() {
        return;
    }
    

    render() {
        const {lobbyContext} = this.props;               

        if (!lobbyContext.currentPlayer) {
            return <div>Registering...</div>;
        }

        return (
            <div>
                <h1>CurrentPlayer: {lobbyContext.currentPlayer.name}</h1>
                {this.state.current() }
                <div>
                    //TODO: chat
                </div>
            </div>);
    }
}
