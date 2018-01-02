import React, { PureComponent } from 'react';
import { BackButton } from 'binary-components';
import MobilePage from '../containers/MobilePage';
import UpgradeToRealCard from './UpgradeToRealCard';
import UpgradeToMaltainvestCard from './UpgradeToMaltainvestCard';

type Props = {
  settings: object,
  loginid: string,
  residenceList: any[],
  boot: any[],
  states: any[],
  upgradeInfo: object,
  selectedCurrency: string,
};

export default class UpgradeCard extends PureComponent {
  props: Props;

  goBack = () => {
    window.history.back();
  }

  render() {
    const { settings, upgradeInfo } = this.props;

    return (
      <MobilePage toolbarShown={false} inverse>
        <div className="header inverse">
          <BackButton onClick={this.goBack} />
        </div>
        { upgradeInfo.typeOfNextAccount === 'Real' &&
          <UpgradeToRealCard {...this.props} {...settings} />
        }
        { upgradeInfo.typeOfNextAccount === 'Investment' &&
          <UpgradeToMaltainvestCard {...this.props} {...settings} />
        }
      </MobilePage>
    );
  }
}
