import React, { PureComponent } from 'react';
import { BackButton } from 'binary-components';
import MobilePage from '../containers/MobilePage';
import SetCurrency from './SetCurrency';

type Props = {
  accounts: object,
  account: object,
  loginid: string,
};

export default class SetCurrencyCard extends PureComponent {
  props: Props;

  goBack = () => {
    window.history.back();
  }

  render() {
    return (
      <MobilePage toolbarShown={false} inverse>
        <div className="header inverse">
          <BackButton onClick={this.goBack} />
        </div>
        <SetCurrency {...this.props} />
      </MobilePage>
    );
  }
}
