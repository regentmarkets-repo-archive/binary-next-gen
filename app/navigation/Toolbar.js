import React from 'react';
import { Link } from 'react-router';

const Toolbar = () => (
	<div>
		<button>☰</button>
		<Link to={'/tick-trade'} className="button">Trade</Link>
		<Link to={'/portfolio'} className="button">Portfolio</Link>
	</div>
);

export default Toolbar;
