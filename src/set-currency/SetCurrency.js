import React, { PureComponent } from 'react';
import { RadioGroup, Button, Legend, P, ServerErrorMsg, ErrorMsg } from 'binary-components';
import { store } from '../_store/persistentStore';
import { setAccountCurrency } from '../_data/LiveData';

export default class SetCurrency extends PureComponent {
  props: {
    account: any[],
  };

  static contextTypes = {
    router: () => undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: '',
      progress: false,
      serverError: false,
      hasError: false,
    };
  }

  setCurrency = (e: SyntheticEvent) => {
    this.setState({ selectedCurrency: e.target.value });
  };

  submitCurrency = async () => {
    const currency = this.state.selectedCurrency;
    if (!currency) {
      this.setState({ hasError: true });
    } else {
      try {
        this.setState({
          progress: true,
          serverError: false,
        });
        setAccountCurrency(currency, store);
        this.context.router.push('/');
        window.location.reload();
      } catch (e) {
        this.setState({ serverError: e.error.error.message });
      } finally {
        this.setState({
          progress: false,
        });
      }
    }
  }

  render() {
    const { progress, serverError, selectedCurrency, hasError } = this.state;
    const { account } = this.props;
    const currencyOptions = account.available_currencies;

    return (
      <div className="set-currency-card">
        {hasError && <ErrorMsg text="Please select currency" />}
        {serverError && <ServerErrorMsg text={serverError} />}
        <Legend text="Select currency" />
        <P text="Please select the currency of this account:" />
        {currencyOptions && currencyOptions.length &&
          <RadioGroup id="set-currency-select" options={currencyOptions} value={selectedCurrency} onChange={this.setCurrency} />
        }
        <Button text="Confirm" disabled={progress} onClick={this.submitCurrency} />
      </div>
    );
  }
}
