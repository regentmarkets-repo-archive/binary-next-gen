import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import SidebarBtn from './SidebarBtn';
import sidebarSelectors from './sidebarSelectors';

@connect(sidebarSelectors)
export default class MobileSidebar extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

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
				</div>
				<SidebarBtn to="/settings-mobile" img="img/settings.svg" text="Settings" />
				<SidebarBtn to="/signout" img="img/signout.svg" text="Sign Out" />
			</nav>
		);
	}
}
