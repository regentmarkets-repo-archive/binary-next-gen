import React, { PureComponent } from 'react';
import AccountMenuItem from './AccountMenuItem';
import SidebarBtn from './SidebarBtn';

export default class AccountItemsList extends PureComponent {

	props: {
		loginid: string,
		accounts: Account[],
    landingCompany: object,
	};

	render() {
		const { loginid, accounts, landingCompany } = this.props;
		const allUserAccounts = accounts.map((val) => val.account);
    const userHasMLT = allUserAccounts.some(value => value.startsWith('MLT'));
    const userHasMX = allUserAccounts.some(value => value.startsWith('MX'));
    const userHasCR = allUserAccounts.some(value => value.startsWith('CR'));
    const userHasMF = allUserAccounts.some(value => value.startsWith('MF'));
    const isVirtual = loginid.startsWith('VRTC');
    const isMLT = loginid.startsWith('MLT');

    /* eslint-disable */
    const shouldShowUpgrade = () => {
			if (landingCompany.id !== 'jp') {
        if (landingCompany.hasOwnProperty('financial_company') && landingCompany.financial_company.shortcode === 'maltainvest') {
          if (landingCompany.hasOwnProperty('gaming_company')) {
						// can upgrade to real or maltainvest
						if (isVirtual && !userHasMLT && !userHasMX && !userHasCR) {
               return 'toReal';
						//	 to mlt
						} else if (isMLT && !userHasMF) {
							return 'toMaltainvest';
						//	to mf
						}
					} else if (isVirtual && !userHasMF) {
            //	upgrade to maltainvest
            return 'toMaltainvest';
          }
        } else if (landingCompany.hasOwnProperty('financial_company') && landingCompany.financial_company.shortcode !== 'maltainvest') {
          if (isVirtual && !userHasMLT && !userHasMX && !userHasCR) {
            // can upgrade to real
						return 'toReal';
					}
				}
			}
    };
    /* eslint-enable */

    return (
			<div className="account-items-list">
				{ (shouldShowUpgrade() === 'toReal' || shouldShowUpgrade() === 'toMaltainvest') &&
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
