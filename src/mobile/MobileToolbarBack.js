import React, { PropTypes, PureComponent } from 'react';
import ArrowBack from 'react-material-design-icons/icons/ArrowBack';
import { M } from 'binary-components';

export default class MobileToolbarBack extends PureComponent {

	static propTypes = {
		backBtnBarTitle: PropTypes.string.isRequired,
		onClick: PropTypes.func,
	};

	onClickBack = e => {
		e.preventDefault();
		history.back();
	};

	render() {
		const { backBtnBarTitle, onClick } = this.props;

		return (
			<div className="mobile-toolbar">
				<div
					className="mobile-back-btn"
					onClick={onClick || this.onClickBack}
				>
					<ArrowBack className="back-btn" width="3.5em" height="3.5em" />
					<M m={backBtnBarTitle} />
				</div>
			</div>
		);
	}
}
