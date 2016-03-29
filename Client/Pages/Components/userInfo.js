var React = require('react');
class UserInfo extends React.Component {
    render() {
        let { user } = this.props;
        if (user.isHuman) {
            if (!user.name.startsWith("Guest")) {
                return (React.createElement("div", {"className": "user"}, React.createElement("img", {"className": "avatar", "src": user.avatarUrl, "title": user.name}), React.createElement("div", {"className": "money"}, React.createElement("span", {"className": "coin"}, user.money))));
            }
            else {
                return (React.createElement("div", {"className": "user"}, React.createElement("div", {"className": "guest", "title": user.name}), React.createElement("div", {"className": "money"}, React.createElement("span", {"className": "coin"}, user.money))));
            }
        }
        else {
            return (React.createElement("div", {"className": "user"}, React.createElement("div", {"className": "computer", "title": user.name}), React.createElement("div", {"className": "money"}, React.createElement("span", {"className": "coin"}, user.money))));
        }
    }
}
exports.UserInfo = UserInfo;
//# sourceMappingURL=userInfo.js.map