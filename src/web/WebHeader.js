import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Logo from '../_common/Logo';
import WebSidebarContainer from '../sidebar/WebSidebarContainer';
import Balance from '../balance/BalanceContainer';
import LayoutPickerContainer from '../layout-picker/LayoutPickerContainer';

export default class WebHeader extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		const { actions } = this.props;

		return (
			<div id="header" className="inverse">
				<Logo />
				<LayoutPickerContainer actions={actions} />
				<div className="spacer" />
				<Balance />
				<WebSidebarContainer />
			</div>
		);
	}
}
