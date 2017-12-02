import React, { PureComponent } from 'react';
import { BackButton } from 'binary-components';
import MobilePage from '../containers/MobilePage';
import SetCurrency from './SetCurrency';

type Props = {
  account: object,
};

export default class SetCurrencyCard extends PureComponent {
  props: Props;

  static contextTypes = {
    router: () => undefined,
  }

  goBack = () => {
    window.history.back();
  }

  render() {
    return (
      <MobilePage toolbarShown={false}>
        <div className="header inverse">
          <BackButton onClick={this.goBack} />
        </div>
        <SetCurrency {...this.props} />
      </MobilePage>
    );
  }
}
