import 'ms-signalr-client';
import {User} from "./players/user";
import {subscribe} from "../utils/helpers";

export class ChatContext {

    onChange: () => void;
    chatServer: SignalR.Hub.Proxy;
    messages: {
        id: number;
        who: User,
        message: string
    }[];

    private lastId: number = 0;

    constructor(chatServer: SignalR.Hub.Proxy) {
        this.chatServer = chatServer;
        this.onChange = () => { };
        this.messages = [];

        subscribe(this, this.chatServer);
    }

    serverRecieveMessage(who: User, message:string) {
        this.messages = [({ who: who, message: message, id: this.lastId++ }),...this.messages];
        this.onChange();
    }

    sendMessage(message: string) {
        this.chatServer.invoke("SendMessage", message);
    }
}