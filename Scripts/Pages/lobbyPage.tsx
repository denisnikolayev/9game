import * as React from "react";
import {LobbyContext} from "../model/lobbyContext";
import {Container} from "../model/container";

interface ILobbyPageProps {
    location:{query:{gameId?:string}}
    }

export class LobbyPage extends React.Component<ILobbyPageProps, { lobbyContext: LobbyContext}> {
    constructor(props:ILobbyPageProps) {
        super(props);
        this.state = { lobbyContext: Container.lobbyContext };
        Container.lobbyContext.onChange = () => this.setState({
            lobbyContext: Container.lobbyContext
        });
       
        Container.lobbyContext.checkGameId(this.props.location.query.gameId);        
    }   

    componentWillUnmount() {
        Container.lobbyContext.onChange = null;
    }

    stateChooseGame() {
        let {lobbyContext} = this.state;
        return <div>
                    <button onClick={() => lobbyContext.connectToRandomGame() } > ConnectToRandomGame</button>
                    <button>CreateFriendGame</button>
                    <button>PlayWithComputer</button>
            </div>;
    }    

    stateWaitGamers() {
        return <div>Waiting</div>;
    }
    

    render() {
        const {lobbyContext} = this.state;               

        if (!lobbyContext.currentPlayer) {
            return <div>Registering...</div>;
        }

        return (
            <div>
                <h1>CurrentPlayer: {lobbyContext.currentPlayer.name}</h1>
                {this.props.location.query && this.props.location.query.gameId?this.stateWaitGamers():this.stateChooseGame()}
                <div>
                    //TODO: chat
                </div>
            </div>);
    }
}
