import React from 'react';
import InputGroup from '../common/InputGroup';

export default class SettingsSecurity extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div>
				<p>An additional password can be used to restrict access to the cashier.</p>
				<InputGroup id="cashierlockpassword1" label="Cashier password" type="password" />
				<InputGroup id="cashierlockpassword2" label="Re-enter your password" type="password" />
				<button>Update</button>
			</div>
		);
	}
}
