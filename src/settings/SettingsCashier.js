import React, { PureComponent } from 'react';
import SettingsCashierLocked from './SettingsCashierLocked';
import SettingsCashierUnlocked from './SettingsCashierUnlocked';

export default class SettingsCashier extends PureComponent {

    props: {
		cashier_password: number,
	};

	render() {
		const { cashier_password } = this.props;

        return cashier_password ?
            <SettingsCashierLocked /> :
            <SettingsCashierUnlocked />;
	}
}
