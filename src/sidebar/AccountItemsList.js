import React, { PureComponent } from 'react';
import AccountMenuItem from './AccountMenuItem';
import SidebarBtn from './SidebarBtn';
import { store } from '../_store/persistentStore';

export default class AccountItemsList extends PureComponent {

	props: {
		loginid: string,
		accounts: Account[],
    landingCompany: object,
	};

	render() {
    const { loginid, accounts } = this.props;
    const shouldShowUpgrade = store.getState().appState.get('shouldShowUpgrade');

    return (
			<div className="account-items-list">
				{ (shouldShowUpgrade === 'toReal' || shouldShowUpgrade === 'toMaltainvest') &&
					<SidebarBtn to="/upgrade" img="img/icon.png" text="Upgrade" />
				}
				{accounts
					.filter(x => x.account !== loginid)
					.map(x => <AccountMenuItem key={x.token} account={x.account} token={x.token} />)
				}
			</div>
		);
	}
}
