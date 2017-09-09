import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { store } from '../_store/persistentStore';
import MobilePage from '../containers/MobilePage';
import UpgradeToRealCard from './UpgradeToRealCard';
import UpgradeToMaltainvestCard from './UpgradeToMaltainvestCard';

type Props = {
  settings: object,
  loginid: string,
  residenceList: any[],
};

export default class UpgradeCard extends PureComponent {
  props: Props;

  render() {
    const { settings } = this.props;
    const shouldShowUpgrade = store.getState().appState.get('shouldShowUpgrade');

    return (
      <MobilePage toolbarShown={false} inverse>
      { shouldShowUpgrade === 'toReal' &&
          <UpgradeToRealCard {...immutableChildrenToJS(this.props)} {...settings} />
        }
        { shouldShowUpgrade === 'toMaltainvest' &&
          <UpgradeToMaltainvestCard {...immutableChildrenToJS(this.props)} {...settings} />
        }
      </MobilePage>
    );
  }
}
