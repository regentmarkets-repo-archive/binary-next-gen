import React, { PureComponent } from 'react';
import { RadioGroup, Button, Legend, P, ServerErrorMsg } from 'binary-components';
import { api } from '../_data/LiveData';
import storage from '../_store/storage';

export default class SetCurrencyCard extends PureComponent {
  props: {
    account: object,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: '',
      progress: false,
      serverError: false,
    };
  }

  setCurrency = (e: SyntheticEvent) => {
    this.setState({ selectedCurrency: e.target.value });
  };

  submitCurrency = async () => {
    const currency = this.state.selectedCurrency;
    try {
      this.setState({
        progress: true,
        serverError: false,
      });
      api.setAccountCurrency(currency);
      window.location = window.BinaryBoot.baseUrl;
    } catch (e) {
      this.setState({ serverError: e.error.error.message });
    } finally {
      this.setState({
        progress: false,
      });
    }
    api.setAccountCurrency(this.state.selectedCurrency);
  }

  render() {
    const { progress, serverError, selectedCurrency } = this.state;
    const { account } = this.props;
    const currencyOptions = account.available_currencies;

    return (
      <div className="set-currency-card">
        {serverError && <ServerErrorMsg text={serverError} />}
        <Legend text="Select currency" />
        <P text="Please select the currency of this account:" />
        <RadioGroup options={currencyOptions} value={selectedCurrency} onChange={this.setCurrency} />
        <Button text="Confirm" disabled={progress} onClick={this.submitCurrency} />
      </div>
    );
  }
}
