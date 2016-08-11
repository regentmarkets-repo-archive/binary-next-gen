import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import countryListSelector from '../create-account/countryListSelector';
import MobilePage from '../containers/MobilePage';
import UpgradeCard from './UpgradeCard';

@connect(countryListSelector)
export default class UpgradeContainer extends PureComponent {

	render() {
		return (
			<MobilePage toolbarShown={false} inverse>
				<UpgradeCard {...immutableChildrenToJS(this.props)} />
			</MobilePage>
		);
	}
}
