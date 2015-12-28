import React from 'react';
import { Link } from 'react-router';
import { M } from '../_common';

export default ({ backBtnBarTitle }) => (
	<div className="mobile-toolbar">
		<Link
			to={'/'}
			activeClassName="active"
			className="mobile-back-btn"
			onClick={e => {
				e.preventDefault();
				history.back();
				}}
		>
			<img className="back-btn" src="img/arrow-back.svg" />
			<M m={backBtnBarTitle} />
		</Link>
	</div>
);
