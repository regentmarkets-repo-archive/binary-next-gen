import React from 'react';
import { Link } from 'react-router';

export default ({backBtnBarTitle}) => (
	<div className="mobile-toolbar">
		<Link to="/tick-trade" activeClassName="active" className="mobile-back-btn">
			<span className="back-btn">⇦</span>
			{backBtnBarTitle}
		</Link>
	</div>
);
