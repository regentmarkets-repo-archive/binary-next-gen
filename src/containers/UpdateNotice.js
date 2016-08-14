import React, { PropTypes, PureComponent } from 'react';
import { M, P } from 'binary-components';
import AnimatedPopup from './AnimatedPopup';

export default class UpdateNotice extends PureComponent {

	static propTypes = {
		img: PropTypes.string,
		title: PropTypes.string,
		text: PropTypes.string.isRequired,
		show: PropTypes.bool,
	};

	render() {
		const { img, title, text, show } = this.props;

		return (
			<AnimatedPopup shown={show}>
				<div className="update-notice notice-msg">
					<img src={img} alt={title} />
					{title && <h5><M m={title} /></h5>}
					<P text={text} />
				</div>
			</AnimatedPopup>
		);
	}
}
