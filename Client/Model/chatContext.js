require('ms-signalr-client');
var helpers_1 = require("../utils/helpers");
class ChatContext {
    constructor(chatServer) {
        this.lastId = 0;
        this.chatServer = chatServer;
        this.onChange = () => { };
        this.messages = [];
        helpers_1.subscribe(this, this.chatServer);
    }
    serverRecieveMessage(who, message) {
        this.messages = [({ who: who, message: message, id: this.lastId++ }), ...this.messages];
        this.onChange();
    }
    sendMessage(message) {
        this.chatServer.invoke("SendMessage", message);
    }
}
exports.ChatContext = ChatContext;
//# sourceMappingURL=chatContext.js.map