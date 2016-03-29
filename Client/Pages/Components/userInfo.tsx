import * as React from 'react';
import {User} from "../../model/players/user";

export class UserInfo extends React.Component<{user: User, key?:any}, {}> {
    render() {
        let {user} = this.props;

        if (user.isHuman) {
            if (!user.name.startsWith("Guest")) {
                return (
                    <div className="user">
                    <img className="avatar" src={user.avatarUrl} title={user.name} />
                    <div className="money"><span className="coin">{user.money}</span></div>
                        </div>
                );
            } else {
                return (
                    <div className="user">
                        <div className="guest" title={user.name}></div>
                        <div className="money"><span className="coin">{user.money}</span></div>
                    </div>
                );
            }
        } else {
            return (
                <div className="user">
                    <div className="computer" title={user.name}></div>
                    <div className="money"><span className="coin">{user.money}</span></div>
                    </div>
            );
        }
    }
}