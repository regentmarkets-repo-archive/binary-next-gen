import React from 'react';
import { Link } from 'react-router';

export default ({ backBtnBarTitle }) => (
	<div className="mobile-toolbar">
		<Link to="/tick-trade" activeClassName="active" className="mobile-back-btn">
			<img className="back-btn" src="img/arrow-back.svg" />
			{backBtnBarTitle}
		</Link>
	</div>
);
