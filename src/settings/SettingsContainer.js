import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import SettingsCard from './SettingsCard';
import settingsSelectors from './settingsSelectors';

@connect(settingsSelectors)
export default class SettingsContainer extends PureComponent {

	render() {
		return (
			<SettingsCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
