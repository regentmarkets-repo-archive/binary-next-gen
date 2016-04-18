import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import SidebarBtn from './SidebarBtn';
import sidebarSelectors from './sidebarSelectors';

@connect(sidebarSelectors)
export default class MobileSidebar extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		email: PropTypes.string.isRequired,
		loginid: PropTypes.string.isRequired,
	};

	render() {
		const { loginid, email } = this.props;

		return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
				</div>
				<SidebarBtn to="/deposit" img="img/profit.svg" text="Deposit" />
				<SidebarBtn to="/settings-mobile" img="img/settings.svg" text="Settings" />
				<SidebarBtn to="/signout" img="img/signout.svg" text="Sign Out" />
			</nav>
		);
	}
}
