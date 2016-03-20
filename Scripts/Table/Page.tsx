import * as React from 'react';
import {Card, cardsBackgroundsCache} from "../model/card";
import {suits, indexes, size} from "../model/consts";


export class TablePage extends React.Component<{}, {}> {
    render() {
        var card = (suit: number, index: number) =>
            <div className="card" style={{ backgroundPosition: cardsBackgroundsCache[suit][index] }} ></div>
            ;

        var list = suits.map(suit=> <div>
                {indexes.map(index=> card(suit, index)) }
            </div>);

        return (
            <div className="table">
                <h1 className="bank">Bank: <span className="coin">150</span></h1>
                <div className="left_gamer">
                    <h2>Player #1</h2>
                    {[...Array(12).keys()].map(i=> <div className="small_back" />) }
                    <div className="money"><span className="coin">150</span></div>
                </div>

                <div className="right_gamer">
                    <h2>Player #2</h2>
                     {[...Array(12).keys()].map(i=> <div className="small_back" />) }
                    <div className="money"><span className="coin">150</span></div>
                </div>    

                <div className="main">
                    {list}
                </div>    
                
                <div className="current_gamer">
                    <div className="money"><span className="coin">150</span></div>
                    {[...Array(12).keys()].map(i=> <div className="card" />) }
                </div>                    
            </div>
        );
    }
}