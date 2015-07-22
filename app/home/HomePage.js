import React from 'react';
import { Link } from 'react-router';

export default class HomePage {

	render() {
		return (
			<div>
				<h3><Link to={`/login`}>Login</Link></h3>
				<h3><Link to={`/signup`}>Signup</Link></h3>
				<h3><Link to={`/ticks`}>Ticks</Link></h3>
				<h3><Link to={`/offerings`}>Offerings</Link></h3>
				<h3><Link to={`/active-symbols`}>Active Symbols</Link></h3>
				<h3><Link to={`/markets`}>Markets</Link></h3>
				<h3><Link to={`/asset-index`}>Asset Index</Link></h3>
				<h3><Link to={`/rise-fall-table`}>Rise/Fall Table</Link></h3>
				<h3><Link to={`/trading-times`}>Trading Times</Link></h3>
				<h3><Link to={`/pricing-table`}>Pricing Table</Link></h3>
			</div>
		);
	}
}
