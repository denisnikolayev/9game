var React = require('react');
var container_1 = require("../../model/container");
class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            chatContext: container_1.Container.chatContext,
            message: ""
        };
    }
    componentDidMount() {
        container_1.Container.chatContext.onChange = () => this.setState({ chatContext: container_1.Container.chatContext });
    }
    componentWillUnmount() {
        container_1.Container.chatContext.onChange = () => { };
    }
    onMessageChange(e) {
        this.setState({ message: e.target.value });
    }
    onKeyUp(e) {
        if (e.keyCode == 13) {
            container_1.Container.chatContext.sendMessage(this.state.message);
            this.setState({ message: "" });
        }
    }
    render() {
        let { chatContext } = this.state;
        var messages = chatContext.messages.map(row => React.createElement("div", {"key": row.id, "className": "row"}, React.createElement("span", {"className": "sender"}, row.who.name, ":"), row.message));
        return (React.createElement("div", {"className": "chat-component"}, React.createElement("div", {"className": "messages"}, messages), React.createElement("div", {"className": "message"}, React.createElement("input", {"type": "text", "value": this.state.message, "onChange": this.onMessageChange.bind(this), "onKeyUp": this.onKeyUp.bind(this)}))));
    }
}
exports.Chat = Chat;
//# sourceMappingURL=chat.js.map