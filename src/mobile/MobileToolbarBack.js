import React, { PropTypes, PureComponent } from 'react';
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
					<img className="back-btn" src="img/arrow-back.svg" alt="Back" />
					<M m={backBtnBarTitle} />
				</div>
			</div>
		);
	}
}
