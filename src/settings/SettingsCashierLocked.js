import React, { PureComponent } from 'react';
import { showError } from 'binary-utils';
import { P, Button, InputGroup } from 'binary-components';
import * as LiveData from '../_data/LiveData';

export default class SettingsCashierLocked extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            password1: '',
        };
    }

    onPassword1Change = e =>
        this.setState({ password1: e.target.value });

    unlockCashier = () => {
        const { password1 } = this.state;
        this.sendRequest({ unlock_password: password1 });
    }

    async sendRequest(req) {
        try {
            await LiveData.api.setCashierLock(req);
            this.setState({ password1: '' });
        } catch (e) {
            showError(e.message);
        }
    }

	render() {
        const { password1 } = this.state;

		return (
			<div className="settings-cashier-lock">
                <P
                    className="notice-msg"
                    text="Cashier is locked per your request. To unlock it, enter your password."
                />
				<InputGroup
					id="password1"
                    placeholder="New Password"
					type="password"
                    value={password1}
					onChange={this.onPassword1Change}
				/>
				<Button
                    text="Unlock Cashier"
                    onClick={this.unlockCashier}
				/>
			</div>
		);
	}
}
