import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Logo from 'binary-components/lib/Logo';
import WebSidebarContainer from '../sidebar/WebSidebarContainer';
import Balance from '../balance/BalanceContainer';
import LayoutPickerContainer from '../layout-picker/LayoutPickerContainer';

export default class WebHeader extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

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
