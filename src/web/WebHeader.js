import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import shouldPureComponentUpdate from 'react-pure-render/function';
import config from '../config';
import M from '../_common/M';
import ClockContainer from './ClockContainer';
import LanguagePicker from '../_common/LanguagePicker';
import WebSidebar from '../sidebar/WebSidebar';
import ToggleButtonsContainer from './ToggleButtonsContainer';
import Balance from '../balance/BalanceContainer';
import NewTradeButton from './NewTradeButtonContainer';

export default class WebHeader extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		const { actions } = this.props;

		return (
			<div id="header" className="inverse">
				<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
				<label id="hamburger-overlay" htmlFor="hamburger-closer"></label>
				<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
				<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
					<img src="img/menu.svg" />
					<WebSidebar />
				</label>
				<div id="logo">
					<img src={config.logo} />
					<img src={config.logo2} />
				</div>

				<div id="clock" >
					<ClockContainer />
				</div>

				<ToggleButtonsContainer actions={this.props.actions} />

				<NewTradeButton
					id="new-trade-btn"
					className="btn-secondary"
					actions={actions}
				/>

				<LanguagePicker className="language-picker" />
				<Balance />
				<Link to="/deposit" id="deposit-btn" className="btn-secondary">
					<M m="Deposit" />
				</Link>
			</div>
		);
	}
}
