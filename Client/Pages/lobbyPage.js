var React = require("react");
var container_1 = require("../model/container");
var userInfo_1 = require("./components/userInfo");
var chat_1 = require("./components/chat");
class LobbyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lobbyContext: container_1.Container.lobbyContext };
    }
    componentDidMount() {
        container_1.Container.lobbyContext.onChange = () => this.setState({ lobbyContext: container_1.Container.lobbyContext });
        container_1.Container.lobbyContext.checkGameId(this.props.location.query.gameId);
    }
    componentWillUnmount() {
        container_1.Container.lobbyContext.onChange = () => { };
    }
    stateChooseGame() {
        let { lobbyContext } = this.state;
        return React.createElement("div", null, React.createElement("div", {"className": "row"}, React.createElement("b", null, "If you want to save your money, sign in by -> "), React.createElement("a", {"href": "/login?authscheme=Vk", "className": "btn btn-blue"}, "Vk"), React.createElement("a", {"href": "/login?authscheme=Facebook", "className": "btn btn-blue"}, "Facebook")), React.createElement("div", {"className": "row"}, React.createElement("a", {"href": "javascript:void(0)", "className": "btn btn-blue", "onClick": () => lobbyContext.connectToRandomGame()}, " Connect to a random game"), React.createElement("a", {"href": "javascript:void(0)", "className": "btn btn-blue", "onClick": () => lobbyContext.createFriendGame()}, "Create friend game"), React.createElement("a", {"href": "javascript:void(0)", "className": "btn btn-blue", "onClick": () => lobbyContext.playWithComputer()}, "Play with a computer")));
    }
    stateWaitGamers() {
        var connectedUsers = container_1.Container.lobbyContext.connectedPlayers.map(user => React.createElement(userInfo_1.UserInfo, {"user": user, "key": user.id}));
        return (React.createElement("div", null, React.createElement("a", {"href": "javascript:void(0)", "className": "btn btn-blue add-computer", "onClick": () => container_1.Container.lobbyContext.addComputer()}, "Add a computer"), React.createElement("div", null, "Waiting"), connectedUsers));
    }
    render() {
        const { lobbyContext } = this.state;
        return (React.createElement("div", {"className": "lobby"}, React.createElement("div", {"className": "userInfo"}, React.createElement(userInfo_1.UserInfo, {"user": lobbyContext.currentPlayer})), React.createElement("div", {"className": "mainInfo"}, this.props.location.query && this.props.location.query.gameId ? this.stateWaitGamers() : this.stateChooseGame()), React.createElement("div", {"className": "chat"}, React.createElement(chat_1.Chat, null))));
    }
}
exports.LobbyPage = LobbyPage;
//# sourceMappingURL=lobbyPage.js.map