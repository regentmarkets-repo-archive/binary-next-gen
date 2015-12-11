import React from 'react';
import { Link } from 'react-router';
import { DesktopHeader } from '../navigation';

export default () => (
	<div>
		<DesktopHeader />
		<h4><Link to={`/mobile`}>Tick Trade</Link></h4>
		<h4><Link to={`/login`}>Login</Link></h4>
		<h4><Link to={`/signup`}>Signup</Link></h4>
		<h4><Link to={`/upgrade`}>Upgrade</Link></h4>
	</div>
);
