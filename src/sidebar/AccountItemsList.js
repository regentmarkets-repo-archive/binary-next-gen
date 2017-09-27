import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AccountMenuItem from './AccountMenuItem';
import SidebarBtn from './SidebarBtn';

@connect(state => ({ shouldShowUpgrade: state.appState.get('shouldShowUpgrade') }))
export default class AccountItemsList extends PureComponent {

	props: {
		loginid: string,
		accounts: Account[],
    landingCompany: object,
    shouldShowUpgrade: string,
	};

	render() {
    const { loginid, accounts, shouldShowUpgrade } = this.props;

    return (
			<div className="account-items-list">
				{ (shouldShowUpgrade === 'toReal' || shouldShowUpgrade === 'toMaltainvest') &&
					<SidebarBtn to="/upgrade" img="img/icon.png" text="Upgrade" />
				}
				{accounts
					.filter(x => x.account !== loginid)
					.map(x => <AccountMenuItem key={x.token} account={x.account} token={x.token} currency={x.currency} />)
				}
			</div>
		);
	}
}
