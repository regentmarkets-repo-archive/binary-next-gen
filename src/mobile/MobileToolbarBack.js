import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { M } from '../_common';

export default class MobileToolbarBack extends React.Component {

	static propTypes = {
		backBtnBarTitle: PropTypes.string,
	};

	render() {
		const { backBtnBarTitle } = this.props;

		return (
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
	}
}
