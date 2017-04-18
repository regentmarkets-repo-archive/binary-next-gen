import React, { PureComponent } from 'react';
import { M } from 'binary-components';
import ThemeSwitcher from '../web/ThemeSwitcher.mobile';
import BalanceContainer from '../balance/BalanceContainer';
import AccountItemsList from './AccountItemsList';
import SidebarBtn from './SidebarBtn';
import { signOut } from '../_data/Auth';

type Account = {
    account: string,
    token: string,
};

export default class MobileSidebar extends PureComponent {
    props: {
        email: string,
        loginid: string,
        accounts: Account[],
    };

    onSignOut(e: SyntheticEvent) {
        e.stopPropagation();
        signOut();
    }

    render() {
        const { loginid, email, accounts } = this.props;

        return (
            <nav className="sidebar">
                <div className="account-info">
                    {loginid}<br />
                    {email}<br />
                    <BalanceContainer />
                </div>
                <AccountItemsList loginid={loginid} accounts={accounts} />
                <SidebarBtn
                    to="/watchlist"
                    img="img/watchlist.svg"
                    text="Watchlist"
                />
                <ThemeSwitcher />
                <SidebarBtn
                    to="/settings"
                    img="img/settings.svg"
                    text="Settings"
                />
                <label
                    htmlFor="Sign-Out"
                    onClick={this.onSignOut}
                    className="sidebar-btn"
                >
                    <img src="img/signout.svg" role="presentation" />
                    <M m="Sign Out" />
                </label>
            </nav>
        );
    }
}
