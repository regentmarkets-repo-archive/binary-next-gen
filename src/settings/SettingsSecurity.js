import React, { PropTypes, Component } from 'react';
import showError from 'binary-utils/lib/showError';
import M from 'binary-components/lib/M';
import Button from 'binary-components/lib/Button';
import InputGroup from 'binary-components/lib/InputGroup';
import * as LiveData from '../_data/LiveData';
import isValidPassword from 'binary-utils/lib/isValidPassword';

export default class SettingsSecurity extends Component {

    static propTypes = {
		settings: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

    constructor(props) {
        super(props);
        this.state = {
            password1: '',
            password2: '',
        };
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

	onUpdate = () => {
        const { settings } = this.props;
        const { password1, password2 } = this.state;

        if (!!(settings.cashier_password)) {
            this.sendRequest({
                unlock_password: password1,
            });
        } else {
            isValidPassword(password1, password2) ?
                this.sendRequest({
                    lock_password: password1,
                }) :
                null;   // Handle the error messages here console.log('The passwords do not match or lessthan 7');
        }
    }

	render() {
		const { settings } = this.props;
        const { password1, password2 } = this.state;
		return (
			<div className="mobile-form setting-container">
				<p>
					<M m="An additional password can be used to restrict access to the cashier." />
				</p>
				<InputGroup
					id="password1"
					label="Cashier password"
					type="password"
                    value={password1}
					onChange={e => this.setState({ password1: e.target.value })}
				/>
				{settings.cashier_password ||
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
