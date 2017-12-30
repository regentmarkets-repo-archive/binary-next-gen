import React, { PureComponent } from 'react';
import moment from 'moment';
import { Th, SelectOptGroup, Button, ErrorMsg, P } from 'binary-components';
import { addNewAccount } from '../_utils/AccountHelpers';
import { store } from '../_store/persistentStore';
import { updateUpgradeField } from '../_actions/UpgradeActions';
import { api } from '../_data/LiveData';

export default class CreateNewAccount extends PureComponent {
  static contextTypes = {
    router: () => undefined,
  };

  props : {
    settings: object,
    upgradeInfo: object,
    markets: any[],
    currencyOptions: any[],
    nextAccountTitle: string,
    account: object,
    loginid: string,
  };

  constructor(props) {
    super(props);
    this.CRAccountSettings = props.settings;
    this.state = {
      selected_currency: '',
      currency_error: false,
      disable_create_account: false
    };
  }

  onCurrencyChange = (e: SyntheticEvent) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  addCRToCRAccount = async () => {
    const s = this.CRAccountSettings;
    // Fill in the minimum required info to add an account, cause backend
    // ignores existing fields when creating from real-money account.
    const createAccountParams = {
      salutation: s.salutation,
      date_of_birth: moment.unix(s.date_of_birth).format('YYYY-MM-DD'),
      phone: s.phone,
      residence: s.country_code,
      last_name: s.last_name,
      address_city: s.last_name,
      address_line_1: s.address_line_1,
      first_name: s.first_name,
      currency: this.state.selected_currency
    };
    try {
      const response = await api.createRealAccount(createAccountParams);
      addNewAccount(response.new_account_real);
      location.reload();
    } catch (e) {
      this.setState({ currency_error: true });
      this.setState({ disable_create_account: false });
    }
  }

  submitCreateAccount = () => {
    this.setState({ currency_error: false });
      if (this.CRAccountSettings && /CR/i.test(this.props.loginid)) {
          if (this.props.account.currency && this.props.account.currency !== '') {
              this.setState({ disable_create_account: true });
              this.addCRToCRAccount();
          } else {
              this.setState({ currency_error: true });
          }
      } else {
          this.setState({ disable_create_account: true });
          store.dispatch(updateUpgradeField('selected_currency', this.state.selected_currency));
          this.context.router.push('/upgrade');
      }
    }

  componentWillReceiveProps(nextProps) {
    const { currencyOptions, account } = nextProps;
    if (this.state.selected_currency === '' && currencyOptions.length > 0) {
      this.setState({ selected_currency: currencyOptions[0].value });
      // For CR accounts, adding another CR account should immediately add an account. (you can only
      // do this in CR account). The credentials for this is stored in state attribute "settings".
    }
    if (account.landing_company_name === 'costarica') {
      this.CRAccountSettings = nextProps.settings;
    }
  }

  render() {
    const { upgradeInfo, nextAccountTitle, markets, currencyOptions, loginid } = this.props;
    const { currency_error, disable_create_account } = this.state;

    return (
      <div className="create-new-account-card">
        <legend>
          Create New Account
        </legend>
        {upgradeInfo && !upgradeInfo.canUpgrade &&
          <P text="You have created all accounts available to you." />
        }
        {upgradeInfo && upgradeInfo.canUpgrade &&
        <table>
          <thead>
          <tr>
            <Th text="Account" />
            <Th text="Available Markets" />
            <Th text="Available Currencies" />
            <Th text="Action" />
          </tr>
          </thead>
          <tbody>
          <tr>
            <td> {nextAccountTitle} </td>
            <td> {markets} </td>
            <td>
              <SelectOptGroup
                id="selected_currency"
                options={currencyOptions}
                onChange={this.onCurrencyChange}
              />
            </td>
            <td>
              <Button id="submit" disabled={disable_create_account || currency_error} text="Create" onClick={this.submitCreateAccount} />
            </td>
          </tr>
          </tbody>
        </table>
        }
        {currency_error && <ErrorMsg text={`Please set the currency for your existing account ${loginid}, in order to create more accounts.`} />}
        {upgradeInfo && upgradeInfo.canUpgrade && upgradeInfo.multi &&
        <P
          text="Note: You can only have one fiat currency account and one of each cryptocurrency account."
          className="notice-msg"
        />}
      </div>
    );
  }
}
