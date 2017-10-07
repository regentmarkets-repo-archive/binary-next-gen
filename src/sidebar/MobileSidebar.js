import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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

@connect(state => ({ landingCompany: state.boot.toJS().landingCompany }))
export default class MobileSidebar extends PureComponent {

	props: {
		email: string,
		loginid: string,
		accounts: Account[],
    landingCompany: object,
	};

	onSignOut(e: SyntheticEvent) {
		e.stopPropagation();
		signOut();
	}

	render() {
		const { loginid, email, accounts, landingCompany } = this.props;

		return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
					<BalanceContainer />
				</div>
				<AccountItemsList loginid={loginid} accounts={accounts} landingCompany={landingCompany} />
				<SidebarBtn to="/watchlist" img="img/watchlist.svg" text="Watchlist" />
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
