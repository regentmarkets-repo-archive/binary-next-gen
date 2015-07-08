import React from 'react';

export default class HomePage extends React.Component {
	static getProps() {
		return {};
	}
	render() {
		return (
			<div>
				<h3><a href="/login">Login</a></h3>
				<h3><a href="/Signup">Signup</a></h3>
				<h3><a href="/ticks">Ticks</a></h3>
				<h3><a href="/offerings">Offerings</a></h3>
				<h3><a href="/active-symbols">Active Symbols</a></h3>
				<h3><a href="/markets">Markets</a></h3>
			</div>
		);
	}
}
