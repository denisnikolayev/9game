var consts_1 = require("./consts");
var helpers_1 = require("../utils/helpers");
require('ms-signalr-client');
var opponent_1 = require("./players/opponent");
class GameContext {
    constructor(server) {
        this.onChange = () => { };
        this.onFinish = (gameResult) => { };
        this.server = server;
        helpers_1.subscribe(this, this.server);
    }
    beginGame(gameId, players, bankMoney, player) {
        this.cardsWereOpened = consts_1.suits.map(i => helpers_1.range(consts_1.lengthOfLine, false));
        this.player = player;
        this.gameId = gameId;
        this.setCorrectOpponents(players);
        this.createPlayersCache();
        this.bankMoney = bankMoney;
        this.onChange();
    }
    serverPutCardOnTheTable(playerId, card) {
        this.cardsWereOpened[card.suit][card.index] = true;
        this.players[playerId].removeCard(card);
        this.onChange();
    }
    serverSkipTurn(playerId, lostMoney) {
        debugger;
        this.players[playerId].money -= lostMoney;
        this.bankMoney += lostMoney;
        this.onChange();
    }
    serverYourTurn(availibleCards) {
        this.player.setAvailibleCard(availibleCards);
        this.onChange();
    }
    serverDisconnect(playerId, newUser) {
        this.players[playerId].info = newUser;
        this.onChange();
    }
    serverFinish(gameResult) {
        this.onFinish(gameResult);
    }
    putCardOnTheTable(card) {
        this.player.setAvailibleCard([]);
        this.onChange();
        this.server.invoke("putCardOnTheTable", this.gameId, card);
    }
    setCorrectOpponents(players) {
        var ourIndex = players.findIndex(p => p.id == this.player.id);
        this.leftOpponent = new opponent_1.Opponent(players[(ourIndex + 1) % players.length]);
        this.rightOpponent = new opponent_1.Opponent(players[(ourIndex + 2) % players.length]);
    }
    createPlayersCache() {
        this.players = {};
        this.players[this.leftOpponent.id] = this.leftOpponent;
        this.players[this.rightOpponent.id] = this.rightOpponent;
        this.players[this.player.id] = this.player;
    }
}
exports.GameContext = GameContext;
//# sourceMappingURL=gameContext.js.map