import * as React from 'react';
import {Card, cardsBackgroundsCache} from "../model/card";
import {suits, indexes, size} from "../model/consts";
import {Game} from "../model/game";

export class TablePage extends React.Component<{ game: Game, onPlayerCardClick:(card:Card)=>void}, {}> {
    constructor() {
        super();        
    }       
        
    onPlayerCardClick(card: Card) {
        this.props.onPlayerCardClick(card);
    }

    render() {
        let {game} = this.props;

        var card = (suit: number, index: number) =>
            <div key={`${suit} x ${index}`} className="card" style={{ backgroundPosition: cardsBackgroundsCache[suit][index] }} ></div>;

        var list = suits.map(suit=>
            <div key={suit}>
                {indexes.map(index=> game.cardsWereOpened[suit][index] ? card(suit, index) : <div key={`${suit} x ${index}`} className="emptyCard"></div>) }
            </div>
        );
        
        return (
            <div className="table">
                <h1 className="bank">Bank: <span className="coin">{game.bankMoney}</span></h1>
                <div className="left_gamer">
                    <h2>{game.leftOpponent.name}</h2>
                    {game.leftOpponent.cardsWerePut.map((isPut, index) => <div key={index} className={isPut == false ? "small_back" : "empty_back"} />) }
                    <div className="money"><span className="coin">{game.leftOpponent.money}</span></div>
                </div>
                
                <div className="right_gamer">
                    <h2>{game.rightOpponent.name}</h2>
                    {game.rightOpponent.cardsWerePut.map((isPut, index) => <div key={index} className={isPut == false ? "small_back" : "empty_back"} />) }
                    <div className="money"><span className="coin">{game.rightOpponent.money}</span></div>
                </div>    
                
                <div className="main">
                    {list}
                </div>    
                
                <div className="current_gamer">
                    <div className="money"><span className="coin">{game.player.money}</span></div>
                    {game.player.cards.map(c=> <div
                        key={`${c.suit} x ${c.index}`}
                        className={"card " + (game.player.isCardCanBePut(c)?"can":"")}
                        style={{ backgroundPosition: cardsBackgroundsCache[c.suit][c.index] }}
                        onClick={this.onPlayerCardClick.bind(this, c) }
                        />                        
                        )}
                </div>                    
            </div>
        );
    }
}