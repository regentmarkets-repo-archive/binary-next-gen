import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import shouldPureComponentUpdate from 'react-pure-render/function';
import config from '../config';
import M from '../_common/M';
import WebSidebar from '../sidebar/WebSidebar';
import Balance from '../balance/BalanceContainer';
import NewTradeButton from './NewTradeButtonContainer';
import LayoutPicker from './LayoutPicker';

export default class WebHeader extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		const { actions } = this.props;

		return (
			<div id="header" className="inverse">
				<div id="logo">
					<img src={config.logo} role="presentation" />
					<img src={config.logo2} role="presentation" />
				</div>

				<LayoutPicker tradesCount={4} layoutN={1} />

				<NewTradeButton
					id="new-trade-btn"
					className="btn-secondary"
					actions={actions}
				/>

				<Balance />
				<Link to="/deposit" id="deposit-btn" className="btn-secondary">
					<M m="Deposit" />
				</Link>
				<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
				<label id="hamburger-overlay" htmlFor="hamburger-closer"></label>
				<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
				<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
					<img src="img/menu.svg" alt="Menu" />
					<WebSidebar />
				</label>

			</div>
		);
	}
}
