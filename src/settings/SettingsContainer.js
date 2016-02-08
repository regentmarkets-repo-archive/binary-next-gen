import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import SettingsCard from './SettingsCard';
import settingsSelectors from './settingsSelectors';

@connect(settingsSelectors)
export default class SettingsContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<SettingsCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
