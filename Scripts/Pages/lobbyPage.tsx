import * as React from "react";
import {LobbyContext} from "../model/lobbyContext";
import {Container} from "../model/container";
import {User} from "../model/players/user";
import {UserInfo} from "./components/userInfo";
import {Chat} from "./components/chat";


interface ILobbyPageProps {
    location:{query:{gameId?:string}}
}

export class LobbyPage extends React.Component<ILobbyPageProps, { lobbyContext: LobbyContext}> {
    constructor(props:ILobbyPageProps) {
        super(props);
        this.state = { lobbyContext: Container.lobbyContext };
    }   

    componentDidMount() {
        Container.lobbyContext.onChange = () => this.setState({ lobbyContext: Container.lobbyContext });
        Container.lobbyContext.checkGameId(this.props.location.query.gameId);        
    }

    componentWillUnmount() {
        Container.lobbyContext.onChange = () => { };
    }   

    stateChooseGame() {
        let {lobbyContext} = this.state;
        return <div>
                    <div className="row">
                        <b>If you want to save your money, sign in by -> </b>
                        <a href="/login?authscheme=Vk" className="btn btn-blue" >Vk</a>
                        <a href="/login?authscheme=Facebook" className="btn btn-blue" >Facebook</a>
                    </div>
                    <div className="row">
                        <a href="javascript:void(0)" className="btn btn-blue" onClick={() => lobbyContext.connectToRandomGame() }> Connect to a random game</a>
                        <a href="javascript:void(0)" className="btn btn-blue" onClick={() => lobbyContext.createFriendGame() }>Create friend game</a>
                        <a href="javascript:void(0)" className="btn btn-blue" onClick={() => lobbyContext.playWithComputer() }>Play with a computer</a>
                    </div>
            </div>;
    }    

    stateWaitGamers() {
        var connectedUsers = Container.lobbyContext.connectedPlayers.map(user=> <UserInfo user={user} key={user.id} />);
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
                <div className="userInfo">
                    <UserInfo user={lobbyContext.currentPlayer} />                
                </div>
                <div className="mainInfo">
                    {this.props.location.query && this.props.location.query.gameId ? this.stateWaitGamers() : this.stateChooseGame() }
                </div>
                <div className="chat">
                    <Chat />
                </div>
            </div>);
    }
}
