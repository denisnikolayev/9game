import * as React from 'react';
import {ChatContext} from "../../model/chatContext";
import {Container} from "../../model/container";

export class Chat extends React.Component<{}, { chatContext?: ChatContext, message?: string }> {
    constructor() {
        super();
        this.state = {
            chatContext: Container.chatContext,
            message: ""
        };
    }

    componentDidMount() {
        Container.chatContext.onChange = () => this.setState({ chatContext: Container.chatContext });
    }
    componentWillUnmount() {
        Container.chatContext.onChange = () => { };
    }   

    onMessageChange(e: React.FormEvent) {        
        this.setState({ message: (e.target as any).value });
    }

    onKeyUp(e: React.KeyboardEvent) {
        if (e.keyCode == 13) {
            Container.chatContext.sendMessage(this.state.message);
            this.setState({ message: "" });
        }
    }

    render() {
        let {chatContext} = this.state;

        var messages = chatContext.messages.map(row=> <div key={row.id} className="row"><span className="sender">{row.who.name}:</span>{row.message}</div>);

        return (
            <div className="chat-component">
                    <div className="messages">{messages}</div>
                    <div className="message">
                        <input type="text" value={this.state.message}
                            onChange={this.onMessageChange.bind(this) }
                            onKeyUp={this.onKeyUp.bind(this) } />
                    </div>
            </div>
        );
    }
}