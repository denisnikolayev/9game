var React = require('react');
var card_1 = require("../model/card");
var consts_1 = require("../model/consts");
var container_1 = require("../model/container");
var react_router_1 = require('react-router');
var userInfo_1 = require("./components/userInfo");
var chat_1 = require("./components/chat");
class GamePage extends React.Component {
    constructor() {
        super();
        this.state = {
            gameContext: container_1.Container.gameContext
        };
    }
    componentDidMount() {
        container_1.Container.gameContext.onChange = () => this.setState({ gameContext: container_1.Container.gameContext });
    }
    componentWillUnmount() {
        container_1.Container.gameContext.onChange = () => { };
    }
    onPlayerCardClick(card) {
        this.state.gameContext.putCardOnTheTable(card);
    }
    render() {
        let { gameContext } = this.state;
        if (!gameContext.gameId) {
            setTimeout(() => react_router_1.browserHistory.push("/"));
            return React.createElement("div", null, "Redirecting");
        }
        var card = (suit, index) => React.createElement("div", {"key": `${suit} x ${index}`, "className": "card", "style": { backgroundPosition: card_1.cardsBackgroundsCache[suit][index] }});
        var list = consts_1.suits.map(suit => React.createElement("div", {"key": suit, "className": "row"}, consts_1.indexes.map(index => gameContext.cardsWereOpened[suit][index] ? card(suit, index) : React.createElement("div", {"key": `${suit} x ${index}`, "className": "emptyCard"}))));
        return (React.createElement("div", {"className": "game-page"}, React.createElement("h1", {"className": "bank"}, "Bank: ", React.createElement("span", {"className": "coin"}, gameContext.bankMoney)), React.createElement("div", {"className": "left-gamer"}, React.createElement("div", {"className": "info"}, React.createElement(userInfo_1.UserInfo, {"user": gameContext.leftOpponent.info})), React.createElement("div", {"className": "cards"}, gameContext.leftOpponent.cardsWerePut.map((isPut, index) => React.createElement("div", {"key": index, "className": isPut == false ? "small_back" : "empty_back"})))), React.createElement("div", {"className": "right-gamer"}, React.createElement("div", {"className": "info"}, React.createElement(userInfo_1.UserInfo, {"user": gameContext.rightOpponent.info})), React.createElement("div", {"className": "cards"}, gameContext.rightOpponent.cardsWerePut.map((isPut, index) => React.createElement("div", {"key": index, "className": isPut == false ? "small_back" : "empty_back"})))), React.createElement("div", {"className": "table"}, list), React.createElement("div", {"className": "current-gamer-info"}, React.createElement(userInfo_1.UserInfo, {"user": gameContext.player.info})), React.createElement("div", {"className": "chat"}, React.createElement(chat_1.Chat, null)), React.createElement("div", {"className": "current-gamer"}, gameContext.player.cards.map(c => {
            var canPut = gameContext.player.isCardCanBePut(c);
            return React.createElement("div", {"key": `${c.suit} x ${c.index}`, "className": "card " + (canPut ? "can" : ""), "style": { backgroundPosition: card_1.cardsBackgroundsCache[c.suit][c.index] }, "onClick": canPut ? this.onPlayerCardClick.bind(this, c) : null});
        }))));
    }
}
exports.GamePage = GamePage;
//# sourceMappingURL=gamePage.js.map