import React, { PureComponent } from 'react';
import { RadioGroup, Button, Legend, P, ServerErrorMsg, LogoSpinner } from 'binary-components';
import { api } from '../_data/LiveData';
import storage from '../_store/storage';

export default class SetCurrencyCard extends PureComponent {
  props: {
    account: object,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected_currency: '',
      progress: false,
      serverError: false,
    };
  }

  setCurrency = (e: SyntheticEvent) => {
    this.setState({ selected_currency: e.target.value });
  };

  submitCurrency = async () => {
    const currency = this.state.selected_currency;
    try {
      this.setState({
        progress: true,
        serverError: false,
      });
      const response = await api.setAccountCurrency(currency);
      const account = JSON.parse(storage.getItem('account'));
      account.currency = response.set_account_currency;
      storage.setItem('account', JSON.stringify(account));
      window.location = window.BinaryBoot.baseUrl;
    } catch (e) {
      this.setState({ serverError: e.error.error.message });
    } finally {
      this.setState({
        progress: false,
      });
    }
    api.setAccountCurrency(this.state.selected_currency);
  }

  render() {
    const { progress, serverError } = this.state;
    const { account } = this.props;
    const currencyOptions = account.available_currencies;

    return (
      <div className="set-currency-card">
        <div className="full-logo">
          <LogoSpinner spinning={progress} />
          <img className="logo-text" src="https://style.binary.com/images/logo/logotype_light.svg" alt="Logo" />
        </div>
        {serverError && <ServerErrorMsg text={serverError} />}
        <Legend text="Select currency" />
        <P text="Please select the currency of this account:" />
        <RadioGroup options={currencyOptions} onChange={this.setCurrency} />
        <Button text="Confirm" disabled={progress} onClick={this.submitCurrency} />
      </div>
    );
  }
}
