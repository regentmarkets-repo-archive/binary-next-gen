import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import upgradeSelectors from './upgradeSelectors';
import UpgradeCard from './UpgradeCard';

@connect(upgradeSelectors)
export default class UpgradeContainer extends PureComponent {

  render() {
		return (
			<UpgradeCard {...immutableChildrenToJS(this.props)} />
		);
	}

}
