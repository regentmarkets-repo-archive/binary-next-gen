import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { M, NumberPlain } from '../_common';

@connect(state => ({ account: state.account }))
export default class MobileSidebar extends React.Component {

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
				<Link
					to={`/tick-trade`}
					className="sidebar-btn"
					activeClassName="active">
					<img src="img/trade.svg" />
					<M m="Trade" />
				</Link>
				<Link
					to={`/watchlist-mobile`}
					className="sidebar-btn"
					activeClassName="active">
					<img src="img/watchlist.svg" />
					<M m="Watchlist" />
				</Link>
				<Link
					to={`/portfolio-mobile`}
					className="sidebar-btn"
					activeClassName="active">
					<img src="img/portfolio.svg" />
					<M m="Open Positions" />
				</Link>
				<Link
					to={`/statement-mobile`}
					className="sidebar-btn"
					activeClassName="active">
					<img src="img/statement.svg" />
					<M m="Statement" />
				</Link>
				<Link
					to={`/video-mobile`}
					className="sidebar-btn"
					activeClassName="active">
					<img src="img/profit.svg" />
					<M m="Binary TV" />
				</Link>
				<Link
					to={`/settings-mobile`}
					className="sidebar-btn"
					activeClassName="active">
					<img src="img/settings.svg" />
					<M m="Settings" />
				</Link>
				<Link
					to={`/signout`}
					className="sidebar-btn"
					activeClassName="active">
					<img src="img/signout.svg" />
					<M m="Sign Out" />
				</Link>
			</nav>
		);
	}
}
