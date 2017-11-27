import React, { PureComponent } from 'react';
import { Th, Button } from 'binary-components';

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
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.type}</td>
                <td>{a.availableMarkets}</td>
                <td>
                  {a.currency && <span>{a.currency}</span>}
                  {!a.currency && (a.id !== loginid ? '-' : <Button text="select" onClick={this.onSelectCurrency} />) }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
