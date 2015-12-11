import React from 'react';
import { getSettings } from '../_reducers/SettingsReducers';
import { connect } from 'react-redux';
import SettingsCard from './SettingsCard';

@connect(state => ({ settings: getSettings(state), loginid: state.account.get('loginid') }))
export default class SettingsContainer extends React.Component {

	render() {
		return (
			<SettingsCard {...this.props} />
		);
	}
}
