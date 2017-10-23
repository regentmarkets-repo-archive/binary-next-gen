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
		} else if (window.location.href.indexOf('/beta') === -1) {
			window.location.href = '/';
		} else {
			window.location.href = '/#/beta';
			window.location.reload(true);
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
