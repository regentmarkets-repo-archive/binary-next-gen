import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { store } from '../_store/persistentStore';
import countryListSelector from '../create-account/countryListSelector';
import MobilePage from '../containers/MobilePage';
import UpgradeCard from './UpgradeCard';
import UpgradeToMaltainvestCard from './UpgradeToMaltainvestCard';

@connect(countryListSelector)
export default class UpgradeContainer extends PureComponent {

  render() {
    const shouldShowUpgrade = store.getState().appState.get('shouldShowUpgrade');

		return (
			<MobilePage toolbarShown={false} inverse>
        { shouldShowUpgrade === 'toReal' &&
          <UpgradeCard {...immutableChildrenToJS(this.props)} />
        }
        { shouldShowUpgrade === 'toMaltainvest' &&
          <UpgradeToMaltainvestCard {...immutableChildrenToJS(this.props)} />
        }
			</MobilePage>
		);
	}
}
