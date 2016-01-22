import React from 'react';
import { Link } from 'react-router';

export default ({ to, img }) => (
	<Link
		to={to}
		activeClassName="active"
		className="mobile-nav-btn"
	>
		<img src={img} />
	</Link>
);
