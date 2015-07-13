import React from 'react';
import { Link } from 'react-router';

export default class HomePage extends React.Component {
	static getProps() {
		return {};
	}
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
			</div>
		);
	}
}
