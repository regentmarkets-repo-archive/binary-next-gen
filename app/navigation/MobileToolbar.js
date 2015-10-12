import React from 'react';
import { Link } from 'react-router';

const Toolbar = () => (
	<div>
		<Link to="/nav" activeClassName="active" className="button">☰</Link>
		<Link to={'/tick-trade'} activeClassName="active" className="toolbar-btn">Trade</Link>
		<Link to={'/portfolio-mobile'} activeClassName="active" className="toolbar-btn">Portfolio</Link>
		<Link to={'/statement-mobile'} activeClassName="active" className="toolbar-btn">Statement</Link>
	</div>
);

export default Toolbar;
