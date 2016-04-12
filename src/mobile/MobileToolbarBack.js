import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import M from '../_common/M';

export default class MobileToolbarBack extends Component {

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
					<img className="back-btn" src="img/arrow-back.svg" alt="Back" />
					<M m={backBtnBarTitle} />
				</Link>
			</div>
		);
	}
}
