import React, { PropTypes, Component } from 'react';
import showError from 'binary-utils/lib/showError';
import P from 'binary-components/lib/P';
import Button from 'binary-components/lib/Button';
import InputGroup from 'binary-components/lib/InputGroup';
import * as LiveData from '../_data/LiveData';
import isValidPassword from 'binary-utils/lib/isValidPassword';

export default class SettingsCashierLock extends Component {

    static propTypes = {
		cashier_password: PropTypes.string.isRequired,
		actions: PropTypes.object.isRequired,
	};

    constructor(props) {
        super(props);
        this.state = {
            password1: '',
            password2: '',
        };
    }

	onUpdate = () => {
        const { cashier_password } = this.props;
        const { password1, password2 } = this.state;

        if (cashier_password) {
            this.sendRequest({
                unlock_password: password1,
            });
        } else if (isValidPassword(password1, password2)) {
            this.sendRequest({
                lock_password: password1,
            });
        }
    }

    clearState() {
        this.setState({
            password1: '',
            password2: '',
        });
    }

    async sendRequest(req) {
        try {
            await LiveData.api.setCashierLock(req);
        } catch (e) {
            showError(e.message);
        }

        this.clearState();
    }

	render() {
		const { cashier_password } = this.props;
        const { password1, password2 } = this.state;
		return (
			<div className="settings-cashier-lock">
				<P className="notice-msg" text="An additional password can be used to restrict access to the cashier." />
				<InputGroup
					id="password1"
					label="Cashier password"
					type="password"
                    value={password1}
					onChange={e => this.setState({ password1: e.target.value })}
				/>
				{cashier_password ||
					<InputGroup
						id="password2"
						label="Re-enter your password"
						type="password"
                        value={password2}
                        onChange={e => this.setState({ password2: e.target.value })}
					/>
				}
				<Button
                    text="Update"
                    onClick={this.onUpdate}
				/>
			</div>
		);
	}

}
