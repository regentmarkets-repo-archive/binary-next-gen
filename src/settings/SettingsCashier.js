import React, { PropTypes, Component } from 'react';
import SettingsCashierLocked from './SettingsCashierLocked';
import SettingsCashierUnlocked from './SettingsCashierUnlocked';

export default class SettingsCashier extends Component {

    static propTypes = {
		cashier_password: PropTypes.number.isRequired,
	};

	render() {
		const { cashier_password } = this.props;

        return cashier_password ?
            <SettingsCashierLocked /> :
            <SettingsCashierUnlocked />;
	}
}
