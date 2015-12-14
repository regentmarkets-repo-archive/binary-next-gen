import React from 'react';
import { Link } from 'react-router';
import { M } from '../_common';

export default ({ backBtnBarTitle }) => (
	<div className="mobile-toolbar">
		<Link to="/mobile" activeClassName="active" className="mobile-back-btn">
			<img className="back-btn" src="img/arrow-back.svg" />
			<M m={backBtnBarTitle} />
		</Link>
	</div>
);
