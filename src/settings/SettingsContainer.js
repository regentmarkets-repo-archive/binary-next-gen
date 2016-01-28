import React from 'react';
import { connect } from 'react-redux';
import { getSettings } from '../_reducers/SettingsReducer';
import SettingsCard from './SettingsCard';

@connect(state => ({
	settings: getSettings(state),
	loginid: state.account.get('loginid'),
	appConfig: state.appConfig.toJS(),
}))
export default class SettingsContainer extends React.Component {

	render() {
		return (
			<SettingsCard {...this.props} />
		);
	}
}
