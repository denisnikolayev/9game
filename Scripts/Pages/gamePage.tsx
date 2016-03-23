import * as React from 'react';
import {Card, cardsBackgroundsCache} from "../model/card";
import {suits, indexes, size} from "../model/consts";
import {GameContext} from "../model/gameContext";
import {Container} from "../model/container";

export class GamePage extends React.Component<{}, { gameContext: GameContext }> {
    constructor() {
        super();
        this.state = {
            gameContext: Container.gameContext
        }
        Container.gameContext.onChange = ()=>this.setState({gameContext:Container.gameContext});
    }       
    
     componentWillUnmount() {
        Container.gameContext.onChange = null;
    }   
     
    onPlayerCardClick(card: Card) {
        this.state.gameContext.putCardOnTheTable(card);
    }

    render() {
        let {gameContext} = this.state;

        var card = (suit: number, index: number) =>
            <div key={`${suit} x ${index}`} className="card" style={{ backgroundPosition: cardsBackgroundsCache[suit][index] }} ></div>;

        var list = suits.map(suit=>
            <div key={suit}>
                {indexes.map(index=> gameContext.cardsWereOpened[suit][index] ? card(suit, index) : <div key={`${suit} x ${index}`} className="emptyCard"></div>) }
            </div>
        );
        
        return (
            <div className="table">
                <h1 className="bank">Bank: <span className="coin">{gameContext.bankMoney}</span></h1>
                <div className="left_gamer">
                    <h2>{gameContext.leftOpponent.info.name}</h2>
                    {gameContext.leftOpponent.cardsWerePut.map((isPut, index) => <div key={index} className={isPut == false ? "small_back" : "empty_back"} />) }
                    <div className="money"><span className="coin">{gameContext.leftOpponent.money}</span></div>
                </div>
                
                <div className="right_gamer">
                    <h2>{gameContext.rightOpponent.info.name}</h2>
                    {gameContext.rightOpponent.cardsWerePut.map((isPut, index) => <div key={index} className={isPut == false ? "small_back" : "empty_back"} />) }
                    <div className="money"><span className="coin">{gameContext.rightOpponent.money}</span></div>
                </div>    
                
                <div className="main">
                    {list}
                </div>  
                  
                <div className="money"><span className="coin">{gameContext.player.money}</span></div>
                <div className="current_gamer">
                   
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