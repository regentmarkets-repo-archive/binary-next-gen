import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import M from '../_common/M';

export default class MobileToolbarBack extends Component {

	static propTypes = {
		backBtnBarTitle: PropTypes.string,
		actions: PropTypes.object,
		to: PropTypes.string,
	};
	goBack(e) {
		const { actions } = this.props;
		e.preventDefault();
		actions.resetAssetPickerFilter();
		history.back();
	}
	render() {
		const { backBtnBarTitle } = this.props;
		return (
			<div className="mobile-toolbar">
				<Link
					to={'/'}
					activeClassName="active"
					className="mobile-back-btn"
					onClick={::this.goBack}
				>
					<img className="back-btn" src="/img/arrow-back.svg" alt="Back" />
					<M m={backBtnBarTitle} />
				</Link>
			</div>
		);
	}
}
