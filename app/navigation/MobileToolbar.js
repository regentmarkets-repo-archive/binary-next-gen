import React from 'react';
import { Link } from 'react-router';

const Toolbar = () => (
	<div>
		<Link to={'/nav'} activeClassName="active" className="button">☰</Link>
		<Link to={'/tick-trade'} activeClassName="active" className="button">Trade</Link>
		<Link to={'/portfolio'} activeClassName="active" className="button">Portfolio</Link>
		<Link to={'/statement'} activeClassName="active" className="button">Statement</Link>
	</div>
);

export default Toolbar;
