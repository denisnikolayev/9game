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

        Container.lobbyContext.onChange = () => this.setState({ lobbyContext: Container.lobbyContext });
       
        Container.lobbyContext.checkGameId(this.props.location.query.gameId);        
    }   

    componentWillUnmount() {
        Container.lobbyContext.onChange = () => { };
    }

    stateChooseGame() {
        let {lobbyContext} = this.state;
        return <div>
                    <a href="javascript:void(0)" className="btn btn-blue" onClick={() => lobbyContext.connectToRandomGame() }> Connect to a random game</a>
                    <a href="javascript:void(0)" className="btn btn-blue" onClick={() => lobbyContext.createFriendGame() }>Create friend game</a>
                    <a href="javascript:void(0)" className="btn btn-blue" onClick={() => lobbyContext.playWithComputer() }>Play with a computer</a>
            </div>;
    }    

    stateWaitGamers() {       
        var connectedUsers = Container.lobbyContext.connectedPlayers.map(playerInfo=> <div key={playerInfo.id}>{playerInfo.name}</div>);
        return (
            <div> 
                 <div>Waiting</div>
                 <div>Connected players: </div>
                 {connectedUsers}
            </div>
        );            
    }
    

    render() {
        const {lobbyContext} = this.state; 

        return (
            <div className="lobby">
                <h1>CurrentPlayer: {lobbyContext.currentPlayer.name}</h1>
                {this.props.location.query && this.props.location.query.gameId?this.stateWaitGamers():this.stateChooseGame()}
                <div>
                    //TODO: chat
                </div>
            </div>);
    }
}
