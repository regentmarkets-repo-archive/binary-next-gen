import React, { Component } from 'react';
import Logo from 'binary-components/lib/Logo';
import WebSidebarContainer from '../sidebar/WebSidebarContainer';
import Balance from '../balance/BalanceContainer';
import LayoutPickerContainer from '../layout-picker/LayoutPickerContainer';

export default class WebHeader extends Component {

	render() {
		return (
			<div className="header inverse">
				<Logo />
				<LayoutPickerContainer />
				<Balance />
				<WebSidebarContainer />
			</div>
		);
	}
}
