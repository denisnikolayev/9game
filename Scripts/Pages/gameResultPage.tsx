import * as React from "react";
import {GameResult} from "../model/gameResult";
import {browserHistory} from 'react-router';
import {UserInfo} from "./components/userInfo";

interface IGameResultPageProps {
    location: { state: GameResult }
}

export class GameResultPage extends React.Component<IGameResultPageProps, {}> {    
    onClick() {
        browserHistory.push("/");
    }

    render() {
        const {winner, otherUsers, bankMoney} = this.props.location.state;

        return (<div className="game-result">
                    <h1>Winner <span className="coin">{bankMoney}</span></h1>
                    <div className="winner"><UserInfo user={winner} /></div>
                    <div className="loosers">{otherUsers.map(p=> <UserInfo user={p} key={p.id} />) }</div>                    
                    <div className="buttons"> <a href="javascript:void(0)" className="btn btn-blue" onClick={this.onClick.bind(this)}>Back</a></div>
            </div>);
    }
};
