import React, { PropTypes } from 'react';
import M from '../_common/M';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';

const isValidPassword = (pw1, pw2) => ((pw1 === pw2) && (pw1.length > 6));

export default class SettingsSecurity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password1: '',
            password2: '',
        };
    }

	static propTypes = {
		settings: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

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
            alert(e.message);
        }

        this.clearState();
    }

	onClick() {
        const { settings } = this.props;
        const { password1, password2 } = this.state;

        if (!!(settings.cashier_password)) {
            this.sendRequest({
                unlock_password: password1,
            });
        } else {
            isValidPassword(password1, password2)
                ?
                  this.sendRequest({
                      lock_password: password1,
                  })
                :
                null;   // Handle the error messages here console.log('The passwords do not match or lessthan 7');
        }
    }

	render() {
		const { settings } = this.props;
        const { password1, password2 } = this.state;
		return (
			<div className="mobile-form">
				<p>
					<M m="An additional password can be used to restrict access to the cashier."/>
				</p>
				<InputGroup
					id="password1"
					label="Cashier password"
					type="password"
                    value={password1}
					onChange={e => this.setState({ password1: e.target.value })}
				/>
				{
					!!!(settings.cashier_password) ?
						<InputGroup
							id="password2"
							label="Re-enter your password"
							type="password"
                            value={password2}
                            onChange={e => this.setState({ password2: e.target.value })}
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
