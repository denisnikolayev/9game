var gameContext_1 = require("./gameContext");
var lobbyContext_1 = require("./lobbyContext");
var react_router_1 = require('react-router');
var chatContext_1 = require("./chatContext");
var $ = require('jquery');
require('ms-signalr-client');
class Container {
    static ConnectSignalR() {
        return new Promise((r, e) => Container.connection.start().then(r).fail(e));
    }
}
exports.Container = Container;
// imitation initializing IoC container
Container.connection = SERVER_URL != "" ? $.hubConnection(SERVER_URL) : $.hubConnection();
Container.gameContext = new gameContext_1.GameContext(Container.connection.createHubProxy("Game"));
Container.gameContext.onFinish = (gameResult) => react_router_1.browserHistory.push({ pathname: "/result", state: gameResult });
Container.lobbyContext = new lobbyContext_1.LobbyContext(Container.connection.createHubProxy("Lobby"), Container.gameContext);
Container.lobbyContext.onConnected = (gameId) => react_router_1.browserHistory.push({ pathname: "/lobby", query: { gameId: gameId } });
Container.lobbyContext.onGameStart = () => react_router_1.browserHistory.push("/Game");
Container.chatContext = new chatContext_1.ChatContext(Container.connection.createHubProxy("Chat"));
//# sourceMappingURL=container.js.map