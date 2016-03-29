require('ms-signalr-client');
var helpers_1 = require("../utils/helpers");
var player_1 = require("./players/player");
class LobbyContext {
    constructor(lobbyServer, gameContext) {
        this.lobbyServer = lobbyServer;
        this.onGameStart = () => { };
        this.onChange = () => { };
        this.gameContext = gameContext;
        this.connectedPlayers = [];
        helpers_1.subscribe(this, this.lobbyServer);
    }
    serverRegistered(user) {
        this.onRegisteredResolve();
        this.currentPlayer = user;
        this.onChange();
    }
    serverConnected(gameId, players) {
        this.connectedPlayers = players;
        this.gameId = gameId;
        this.onConnected(gameId);
    }
    serverPlayerConnected(player) {
        this.connectedPlayers.push(player);
        this.onChange();
    }
    serverGameStart(players, bankMoney, yourCards, avaliableCards) {
        var player = new player_1.Player(this.currentPlayer, yourCards, avaliableCards || []);
        this.gameContext.beginGame(this.gameId, players, bankMoney, player);
        this.onGameStart();
    }
    serverRefreshMoney(money) {
        this.currentPlayer.money = money;
        this.onChange();
    }
    registerUser() {
        return new Promise((resolve, reject) => {
            this.onRegisteredResolve = resolve;
            this.lobbyServer.invoke("RegisterUser");
        });
    }
    connectToRandomGame() {
        this.lobbyServer.invoke("ConnectToRandomGame");
    }
    createFriendGame() {
        this.lobbyServer.invoke("CreateFriendGame");
    }
    playWithComputer() {
        this.lobbyServer.invoke("PlayWithComputer");
    }
    addComputer() {
        this.lobbyServer.invoke("AddComputer", this.gameId);
    }
    checkGameId(gameId) {
        if (gameId != this.gameId) {
            this.gameId = gameId;
            this.lobbyServer.invoke("ConnectToGame", gameId);
        }
    }
}
exports.LobbyContext = LobbyContext;
//# sourceMappingURL=lobbyContext.js.map