import React, { PropTypes, Component } from 'react';

export default class WebSidebar extends Component {

	static propTypes = {
		account: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
	};

	switchToAccount = () => {
		const { token } = this.props;
		localStorage.setItem('account', JSON.stringify({ token }));
		window.location = '/';
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
