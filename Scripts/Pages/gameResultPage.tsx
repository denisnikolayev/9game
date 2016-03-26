import * as React from "react";
import {GameResult} from "../model/gameResult";
import {browserHistory} from 'react-router';

interface IGameResultPageProps {
    location: { state: GameResult }
}

export class GameResultPage extends React.Component<IGameResultPageProps, {}> {    
    onClick() {
        browserHistory.push("/");
    }

    render() {
        const {winner, otherUsers, bankMoney} = this.props.location.state;

        return (<div className="gameResult">
                <h1>Winner: {winner.id}</h1>
                <div>Others: {otherUsers.map(p=> <div key={p.id}>{p.id}</div>)}</div>
                <div className="money">Bank money: <span className="coin">{bankMoney}</span> </div>
                <a href="javascript:void(0)" className="btn btn-blue" onClick={this.onClick.bind(this)}>Back</a>
            </div>);
    }
};
