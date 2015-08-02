import React from 'react';

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
				<label for="cashierlockpassword1">Cashier password</label>
				<input id="cashierlockpassword1" type="password" />
				<p class="errorfield" id="errorcashierlockpassword1" />
				<label for="cashierlockpassword2">Re-enter your password</label>
				<input id="cashierlockpassword2" type="password" />
				<p class="errorfield" id="errorcashierlockpassword2" />
				<button>Update</button>
			</div>
		);
	}
}
