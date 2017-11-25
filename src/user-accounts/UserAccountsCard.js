import React, { PureComponent } from 'react';
import { getNextAccountTitle, getCurrenciesForNewAccount, filterMarkets } from '../_utils/Client';
import activeMarkets from '../_constants/ActiveMarkets';
import CreateNewAccount from './CreateNewAccount';
import ExistingAccounts from './ExistingAccounts';

type Props = {
  upgradeInfo: object,
  loginid: string,
  account: any[],
  accounts: any[],
  landingCompany: object,
};

export default class UserAccountsCard extends PureComponent {
  props: Props;

  render() {
    const { upgradeInfo, account } = this.props;
    const nextAccountTitle = getNextAccountTitle(upgradeInfo.typeOfNextAccount);
    const currencyOptions = getCurrenciesForNewAccount(upgradeInfo.currencyOptions, account.currencies_config);
    const markets = filterMarkets(upgradeInfo.allowedMarkets, activeMarkets);
    return (
      <div className="user-accounts-card">
        <CreateNewAccount {...this.props} nextAccountTitle={nextAccountTitle} currencyOptions={currencyOptions} markets={markets} />
        <ExistingAccounts {...this.props} />
      </div>
    );
  }
}
