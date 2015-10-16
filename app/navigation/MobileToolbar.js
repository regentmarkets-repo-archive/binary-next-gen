import React from 'react';
import { Link } from 'react-router';

const Toolbar = () => (
	<div className="mobile-toolbar">
		<Link to="/nav" activeClassName="active" className="toolbar-btn">☰</Link>
		<Link to={'/tick-trade'} activeClassName="active" className="toolbar-btn">Trade</Link>
		<Link to={'/portfolio-mobile'} activeClassName="active" className="toolbar-btn">Portfolio</Link>
		<Link to={`/profit-table-mobile`} activeClassName="active" className="toolbar-btn">Profit Table</Link>
		<Link to={'/statement-mobile'} activeClassName="active" className="toolbar-btn">Statement</Link>
	</div>
);

export default Toolbar;
