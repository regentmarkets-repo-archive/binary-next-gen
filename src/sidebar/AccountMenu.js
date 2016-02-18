import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NumberPlain from '../_common/NumberPlain';
import SidebarBtn from './SidebarBtn';

@connect(state => ({ account: state.account }))
export default class MobileSidebar extends Component {

	static propTypes = {
		account: PropTypes.object.isRequired,
	};

	render() {
		const account = this.props.account.toJS();
		return (
			<nav className="sidebar">
				<div className="account-info">
					{account.loginid}<br/>
					{account.email}<br/>
					<NumberPlain currency={account.currency} value={account.balance} />
				</div>
				<SidebarBtn to="/settings" img="img/settings.svg" text="Settings" />
				<SidebarBtn to="/signout" img="img/signout.svg" text="Sign Out" />
			</nav>
		);
	}
}
