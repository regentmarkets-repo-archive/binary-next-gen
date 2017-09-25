import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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

  render() {
    const { settings, shouldShowUpgrade } = this.props;

    return (
      <MobilePage toolbarShown={false} inverse>
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
