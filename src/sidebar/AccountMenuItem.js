import React, { PropTypes, Component } from 'react';

export default class AccountMenuItem extends Component {

	static propTypes = {
		account: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
	};

	switchToAccount = () => {
		const { token } = this.props;
		localStorage.setItem('account', JSON.stringify({ token }));
		window.location.reload();
	};

	render() {
		const { account } = this.props;

		return (
			<a
				key={account}
				className="sidebar-btn"
				onClick={this.switchToAccount}
			>
				<img src="img/icon.png" alt="" />
				<span>Switch to {account}</span>
			</a>
		);
	}
}
