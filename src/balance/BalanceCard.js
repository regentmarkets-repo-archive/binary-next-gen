import React, { PureComponent } from 'react';
import { NumberPlain } from 'binary-components';

export default class BalanceCard extends PureComponent {

  props: {
    currency: string,
    balance: number,
    digits: number,
  };

  render() {
    const { currency, balance, digits } = this.props;

    return (
      <div>
        {currency && (<NumberPlain
          className="balance"
          currency={currency}
          value={balance}
          digits={digits}
        />)
        }
      </div>
    );
  }
}
