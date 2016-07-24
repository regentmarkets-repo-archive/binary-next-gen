import React, { PureComponent } from 'react';
import showError from 'binary-utils/lib/showError';
import P from 'binary-components/lib/P';
import Button from 'binary-components/lib/Button';
import InputGroup from 'binary-components/lib/InputGroup';
import * as LiveData from '../_data/LiveData';
import isValidPassword from 'binary-utils/lib/isValidPassword';

export default class SettingsCashierUnlocked extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            password1: '',
            password2: '',
        };
    }

    onPassword1Change = e =>
        this.setState({ password1: e.target.value });

    onPassword2Change = e =>
        this.setState({ password2: e.target.value });

    lockCashier = () => {
        const { password1, password2 } = this.state;

        if (isValidPassword(password1, password2)) {
            this.sendRequest({ lock_password: password1 });
        }
    }

    async sendRequest(req) {
        try {
            await LiveData.api.setCashierLock(req);
            this.setState({
                password1: '',
                password2: '',
            });
        } catch (e) {
            showError(e.message);
        }
    }

	render() {
        const { password1, password2 } = this.state;
		return (
			<div className="settings-cashier-lock">
				<P className="notice-msg" text="An additional password can be used to restrict access to the cashier." />
				<InputGroup
					id="password1"
                    placeholder="New Password"
					type="password"
                    value={password1}
					onChange={this.onPassword1Change}
				/>
				<InputGroup
					id="password2"
                    placeholder="Confirm Password"
					type="password"
                    value={password2}
                    onChange={this.onPassword2Change}
				/>
                <Button
                    text="Lock Cashier"
                    onClick={this.lockCashier}
                />
			</div>
		);
	}
}
