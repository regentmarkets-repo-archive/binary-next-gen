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
        upgradeInfo: object,
    };

	onSignOut(e: SyntheticEvent) {
		e.stopPropagation();
		signOut();
	}

	render() {
		const { loginid, email } = this.props;

		return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
					<BalanceContainer />
				</div>
				<AccountItemsList {...this.props} />
				<SidebarBtn to="/watchlist" img="img/watchlist.svg" text="Watchlist" />
                <SidebarBtn to="/user-accounts" img="img/accounts.svg" text="Accounts list" />
				<ThemeSwitcher />
				<SidebarBtn to="/settings" img="img/settings.svg" text="Settings" />
				<label htmlFor="Sign-Out" onClick={this.onSignOut} className="sidebar-btn">
					<img src="img/signout.svg" role="presentation" />
					<M m="Sign Out" />
				</label>
			</nav>
		);
	}
}
