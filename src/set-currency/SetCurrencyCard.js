import React, { PureComponent } from 'react';
import { BackButton } from 'binary-components';
import MobilePage from '../containers/MobilePage';
import SetCurrency from './SetCurrency';

type Props = {
  account: any[],
};

export default class SetCurrencyCard extends PureComponent {
  props: Props;

  goBack = () => {
    window.history.back();
  }

  render() {
    return (
      <MobilePage toolbarShown={false}>
        <div className="header inverse">
          <BackButton onClick={this.goBack} />
        </div>
        <div className="set-currency-card">
            <SetCurrency {...this.props} />
        </div>
      </MobilePage>
    );
  }
}
