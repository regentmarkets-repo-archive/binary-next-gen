import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import SettingsCard from './SettingsCard';
import settingsSelectors from './settingsSelectors';

@connect(settingsSelectors)
export default class SettingsContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<SettingsCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
