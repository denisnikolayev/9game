import * as React from 'react';
import {Card, cardsBackgroundsCache} from "../model/card";
import {suits, indexes} from "../model/consts";
import {GameContext} from "../model/gameContext";
import {Container} from "../model/container";
import {browserHistory} from 'react-router'
import {UserInfo} from "./components/userInfo";
import {Chat} from "./components/chat";

export class GamePage extends React.Component<{}, { gameContext: GameContext }> {
    constructor() {
        super();
        this.state = {
            gameContext: Container.gameContext
        }        
    }    
       
    componentDidMount() {
        Container.gameContext.onChange = () => this.setState({ gameContext: Container.gameContext });
    }
    componentWillUnmount() {
         Container.gameContext.onChange = () => { };
    }   
     
    onPlayerCardClick(card: Card) {
        this.state.gameContext.putCardOnTheTable(card);
    }

    render() {        
        let {gameContext} = this.state;

        if (!gameContext.gameId) {
            setTimeout(() => browserHistory.push("/"));
            return <div>Redirecting</div>;
        }

        var card = (suit: number, index: number) =>
            <div key={`${suit} x ${index}`} className="card" style={{ backgroundPosition: cardsBackgroundsCache[suit][index] }} ></div>;

        var list = suits.map(suit=>
            <div key={suit} className="row">
                {indexes.map(index=> gameContext.cardsWereOpened[suit][index] ? card(suit, index) : <div key={`${suit} x ${index}`} className="emptyCard"></div>) }
            </div>
        );
        
        return (
            <div className="game-page">
                <h1 className="bank">Bank: <span className="coin">{gameContext.bankMoney}</span></h1>
                <div className="left-gamer">
                    <div className="info"><UserInfo user={gameContext.leftOpponent.info} /></div>
                    <div className="cards">{gameContext.leftOpponent.cardsWerePut.map((isPut, index) => <div key={index} className={isPut == false ? "small_back" : "empty_back"} />) }</div>
                </div>
                
                <div className="right-gamer">
                    <div className="info"><UserInfo user={gameContext.rightOpponent.info} /></div>
                    <div className="cards">{gameContext.rightOpponent.cardsWerePut.map((isPut, index) => <div key={index} className={isPut == false ? "small_back" : "empty_back"} />) }</div>
                </div>    
                
                <div className="table">
                    {list}
                </div>  
                  
                <div className="current-gamer-info">
                    <UserInfo user={gameContext.player.info} /> 
                </div>   
                <div className="chat">
                    <Chat />
                </div>             
                <div className="current-gamer">
                   
                    {gameContext.player.cards.map(c=> {
                        var canPut = gameContext.player.isCardCanBePut(c);
                        return <div
                            key={`${c.suit} x ${c.index}`}
                            className={"card " + (canPut ? "can" : "") }
                            style={{ backgroundPosition: cardsBackgroundsCache[c.suit][c.index] }}
                            onClick={canPut?this.onPlayerCardClick.bind(this, c):null }
                            />
                    })}
                </div>                    
            </div>
        );
    }
}