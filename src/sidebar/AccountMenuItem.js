import React, { PureComponent } from 'react';
import storage from '../_store/storage';

export default class AccountMenuItem extends PureComponent {

	props: {
		account: string,
		token: string,
		currency: string
	};

	static contextTypes = {
        router: () => undefined,
    };

	switchToAccount = () => {
		const { token } = this.props;
		storage.setItem('account', JSON.stringify({ token }));
		this.context.router.push('/');
		window.location.reload(true);
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
