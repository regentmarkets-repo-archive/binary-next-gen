import React, { PureComponent } from 'react';
import { M } from 'binary-components';
import storage from '../_store/storage';

export default class AccountMenuItem extends PureComponent {
    props: {
        account: string,
        token: string,
    };

    switchToAccount = () => {
        const { token } = this.props;
        storage.setItem('account', JSON.stringify({ token }));
        window.location.reload();
    };

    render() {
        const { account } = this.props;

        return (
            <a
                key={account}
                className="sidebar-btn"
                onClick={this.switchToAccount}
            >
                <img src="img/icon.png" alt="" />
                <M m="Switch to" />
                &nbsp;
                {account}
            </a>
        );
    }
}
