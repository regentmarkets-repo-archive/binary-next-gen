import React from 'react';
import { Link } from 'react-router';
import { DesktopToolbar } from '../navigation';

export default () => (
	<div>
		<DesktopToolbar />
		<h4><Link to={`/nav`}>Navigation</Link></h4>
		<h4><Link to={`/login`}>Login</Link></h4>
		<h4><Link to={`/tick-trade`}>Tick Trade</Link></h4>
		<h4><Link to={`/portfolio`}>Open Positions</Link></h4>
		<h4><Link to={`/statement`}>Statement</Link></h4>
		<h4><Link to={`/asset-selector`}>Asset Selector</Link></h4>
		<hr />
		<h4><Link to={`/signup`}>Signup</Link>&nbsp;<Link to={`/upgrade`}>Upgrade</Link>&nbsp;<Link to={`/ticks`}>Ticks</Link></h4>
	</div>
);
