import React, { PureComponent } from 'react';
import { Th, SelectOptGroup, Button } from 'binary-components';
import { store } from '../_store/persistentStore';
import EmptySlate from '../containers/EmptySlate';
import { updateUpgradeField } from '../_actions/UpgradeActions';

export default class CreateNewAccount extends PureComponent {
  static contextTypes = {
    router: () => undefined,
  };

  props : {
    upgradeInfo: object,
    markets: any[],
    currencyOptions: object,
    nextAccountTitle: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected_currency: props.currencyOptions[0].value || '',
    };
  }

  onCurrencyChange = (e: SyntheticEvent) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onRedirectToAccountOpening = () => {
    store.dispatch(updateUpgradeField('selected_currency', this.state.selected_currency));
    this.context.router.push('/upgrade');
  }

  render() {
    const { upgradeInfo, nextAccountTitle, markets, currencyOptions } = this.props;

    return (
      <div className="create-new-account-card">
        <legend>
          Create New Account
        </legend>
        {upgradeInfo && !upgradeInfo.canUpgrade &&
          <EmptySlate
            img="img/info.svg"
            text="You have created all accounts available to you."
          />
        }
        {upgradeInfo && upgradeInfo.canUpgrade &&
        <table>
          <thead>
          <tr>
            <Th text="account" />
            <Th text="market" />
            <Th text="currencies" />
            <Th text="action" />
          </tr>
          </thead>
          <tbody>
          <tr>
            <td> {nextAccountTitle} </td>
            <td> {markets} </td>
            <td>
              <SelectOptGroup id="selected_currency" options={currencyOptions} onChange={this.onCurrencyChange} />
            </td>
            <td>
              <Button text="Create" onClick={this.onRedirectToAccountOpening} />
            </td>
          </tr>
          </tbody>
        </table>
        }
      </div>
    );
  }
}
