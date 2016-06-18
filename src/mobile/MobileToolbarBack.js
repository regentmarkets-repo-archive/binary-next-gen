import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import M from 'binary-components/lib/M';

export default class MobileToolbarBack extends Component {

	static propTypes = {
		backBtnBarTitle: PropTypes.string,
	};

	onClickBack = e => {
		e.preventDefault();
		history.back();
	};

	render() {
		const { backBtnBarTitle } = this.props;

		return (
			<div className="mobile-toolbar">
				<Link
					to={'/'}
					activeClassName="active"
					className="mobile-back-btn"
					onClick={this.onClickBack}
				>
					<img className="back-btn" src="/img/arrow-back.svg" alt="Back" />
					<M m={backBtnBarTitle} />
				</Link>
			</div>
		);
	}
}
