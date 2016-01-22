import React from 'react';
import { Link } from 'react-router';
import { M } from '../_common';

export default ({ to, img, text }) => (
	<Link
		to={to}
		activeClassName="active"
		className="sidebar-btn"
	>
	<img src={img} />
		<M m={text} />
	</Link>
);
