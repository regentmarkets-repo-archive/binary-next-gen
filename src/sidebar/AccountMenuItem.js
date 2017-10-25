import React, { PureComponent } from 'react';
import storage from '../_store/storage';

export default class AccountMenuItem extends PureComponent {

	props: {
		account: string,
		token: string,
		currency: string
	};

	switchToAccount = () => {
		const { token } = this.props;
		storage.setItem('account', JSON.stringify({ token }));
		if (window.cordova) {
			window.location.reload(true);
		} else {
			window.location.href = window.BinaryBoot.redirectUrl;
		}
	};

	render() {
		const { account, currency } = this.props;

		return (
			<a
				key={account}
				className="sidebar-btn"
				onClick={this.switchToAccount}
			>
				<img src="img/icon.png" alt="" />
				{account}
				&nbsp;
				{currency && `(${currency})`}
			</a>
		);
	}
}
