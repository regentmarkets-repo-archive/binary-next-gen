import React, { PureComponent } from 'react';
import { Th, Button, P } from 'binary-components';

export default class ExistingAccounts extends PureComponent {
  static contextTypes = {
    router: () => undefined,
  };

  props: {
    loginid: string,
    existingAccounts: object,
  };

  onSelectCurrency = () => {
    this.context.router.push('/set-currency');
  }

  activeMarketRow = (a) => {
    let marketRow = a.availableMarkets;
    if (a.is_disabled && !a.excluded_until) {
      marketRow = 'This account is disabled';
    } else if (a.excluded_until) {
      marketRow = `This account is excluded until ${a.excluded_until}`;
    }
    return <span> {marketRow} </span>;
  }

  render() {
    const { loginid, existingAccounts } = this.props;

    return (
      <div className="create-new-account-card">
        <legend>
          Existing Accounts
        </legend>
        <table>
          <thead>
            <tr>
              <Th text="Account" />
              <Th text="Type" />
              <Th text="Available Markets" />
              <Th text="Currency" />
            </tr>
          </thead>
          <tbody>
          {existingAccounts.map((a, i) =>
              <tr key={i} className={a.is_disabled || a.excluded_until ? 'disabled-color' : ''}>
                <td>{a.id}</td>
                <td>{a.type}</td>
                <td>
                  {this.activeMarketRow(a)}
                </td>
                <td>
                  {a.currency && <span>{a.currency}</span>}
                  {!a.currency && (a.id !== loginid ? '-' :
                    <Button id="select-currency-button" text="Set Currency" onClick={this.onSelectCurrency} />)
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {existingAccounts.some(a => a.is_disabled || a.excluded_until) &&
        <P
          text="Note: For any enquiries regarding disabled or excluded accounts, please contact customer support."
          className="notice-msg"
        />}
      </div>
    );
  }
}
