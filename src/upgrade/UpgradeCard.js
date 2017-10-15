import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
  shouldShowUpgrade: string,
};

@connect(state => ({ shouldShowUpgrade: state.appState.get('shouldShowUpgrade') }))
export default class UpgradeCard extends PureComponent {
  props: Props;

  goBack = () => {
    window.history.back();
  }

  render() {
    const { settings, shouldShowUpgrade } = this.props;

    return (
      <MobilePage toolbarShown={false} inverse>
        <div className="header inverse">
          <BackButton onClick={this.goBack} />
        </div>
        { shouldShowUpgrade === 'toReal' &&
          <UpgradeToRealCard {...this.props} {...settings} />
        }
        { shouldShowUpgrade === 'toMaltainvest' &&
          <UpgradeToMaltainvestCard {...this.props} {...settings} />
        }
      </MobilePage>
    );
  }
}
