import React, { PropTypes } from 'react';
import M from '../_common/M';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';

export default class SettingsSecurity extends React.Component {

	static propTypes = {
		settings: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	static handleUpdateError(response) {
		if (response.code === 'InputValidationFailed') {
			let errorDetails;
			for (const k in response.details) {
				if (response.details.hasOwnProperty(k)) {
					errorDetails = errorDetails + `\n${k} ${response.details[k]}`;
				}
			}
		}
	}

	handleChange(event) {
		const key = event.target.id;		// code duplication, should be refactored into some mixin
		const val = event.target.value;
		const obj = {};
		obj[key] = val;
		this.setState(obj);
	}

    clearState() {
        this.setState({
            cashierlockpassword1: '',
            cashierlockpassword2: '',
        });
    }

	onClick() {
        const state = this.state || {};
        const { settings } = this.props;
        const pwd1 = state.cashierlockpassword1;
        const pwd2 = state.cashierlockpassword2;

        const req = {
            lock_password: state.cashierlockpassword1,
            unlock_password: state.cashierlockpassword1,
        };

        const isValid = (pw1, pw2) => ((pw1 === pw2) && (pw1.length > 6));
        if (!!(settings.cashier_password)) {
            delete req.lock_password;
            LiveData.api.setCashierLock(req)
                .then(
                    response => {
                        if (response.cashier_password === 1) {
                            SettingsSecurity.handleUpdateError(response);
                        }
                    },
                    response => {
                        SettingsSecurity.handleUpdateError(response);
                    }
                ).then(::this.clearState);
        } else {
            delete req.unlock_password;
            isValid(pwd1, pwd2)
                ?
                LiveData.api.setCashierLock(req)
                    .then(
                        response => {
                            if (response.cashier_password === 0) {
                                SettingsSecurity.handleUpdateError(response);
                            }
                        },
                        response => {
                            SettingsSecurity.handleUpdateError(response);
                        }
                    )
                    .then(::this.clearState)
                :
                null;   // Handle the error messages here console.log('The passwords do not match or lessthan 7');
        }
    }

	render() {
		const { settings } = this.props;
		return (
			<div className="mobile-form">
				<p>
					<M m="An additional password can be used to restrict access to the cashier."/>
				</p>
				<InputGroup
					id="cashierlockpassword1"
					label="Cashier password"
					type="password"
                    value={this.state ? this.state.cashierlockpassword1 : ''}
					onChange={::this.handleChange}
				/>
				{
					!!!(settings.cashier_password) ?
						<InputGroup
							id="cashierlockpassword2"
							label="Re-enter your password"
							type="password"
                            value={this.state ? this.state.cashierlockpassword2 : ''}
							onChange={::this.handleChange}
						/>
					:
						null
				}
				<button onClick={::this.onClick}>
					<M m="Update"/>
				</button>
			</div>
		);
	}

}
