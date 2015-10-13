import React from 'react';
import { Link } from 'react-router';
import { DesktopToolbar } from '../navigation';

export default () => (
	<div>
		<DesktopToolbar />
		<h4><Link to={`/nav`}>Navigation</Link></h4>
		<h4><Link to={`/login`}>Login</Link></h4>
		<h4><Link to={`/tick-trade`}>Tick Trade</Link></h4>
		<h4><Link to={`/portfolio-mobile`}>Open Positions</Link></h4>
		<h4><Link to={`/statement-mobile`}>Statement</Link></h4>
		<h4><Link to={`/asset-selector`}>Asset Selector</Link></h4>
		<hr />
		<h4><Link to={`/workspace`}>Workspace</Link> | <Link to={`/portfolio-popup`}>Portfolio Popup</Link> | <Link to={`/signup`}>Signup</Link> | <Link to={`/upgrade`}>Upgrade</Link> | <Link to={`/ticks`}>Ticks</Link> | <Link to="/balances">Balances</Link>
</h4>
	</div>
);
