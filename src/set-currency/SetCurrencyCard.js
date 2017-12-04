import React, { PureComponent } from 'react';
import { BackButton } from 'binary-components';
import SetCurrency from './SetCurrency';

type Props = {
  account: any[],
};

export default class SetCurrencyCard extends PureComponent {
  props: Props;

    static contextTypes = {
        router: () => undefined,
    };

  goBack = () => {
    window.history.back();
  }

  render() {
    return (
      <div>
        <div className="header inverse">
          <BackButton onClick={this.goBack} />
        </div>
        <div className="set-currency-card">
            <SetCurrency {...this.props} />
        </div>
      </div>
    );
  }
}
