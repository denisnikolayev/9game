var React = require("react");
var react_router_1 = require('react-router');
var userInfo_1 = require("./components/userInfo");
class GameResultPage extends React.Component {
    onClick() {
        react_router_1.browserHistory.push("/");
    }
    render() {
        const { winner, otherUsers, bankMoney } = this.props.location.state;
        return (React.createElement("div", {"className": "game-result"}, React.createElement("h1", null, "Winner ", React.createElement("span", {"className": "coin"}, bankMoney)), React.createElement("div", {"className": "winner"}, React.createElement(userInfo_1.UserInfo, {"user": winner})), React.createElement("div", {"className": "loosers"}, otherUsers.map(p => React.createElement(userInfo_1.UserInfo, {"user": p, "key": p.id}))), React.createElement("div", {"className": "buttons"}, " ", React.createElement("a", {"href": "javascript:void(0)", "className": "btn btn-blue", "onClick": this.onClick.bind(this)}, "Back"))));
    }
}
exports.GameResultPage = GameResultPage;
;
//# sourceMappingURL=gameResultPage.js.map