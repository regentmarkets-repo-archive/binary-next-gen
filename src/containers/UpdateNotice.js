import React, { PropTypes, PureComponent } from 'react';
import { P } from 'binary-components';
import AnimatedPopup from './AnimatedPopup';

export default class UpdateNotice extends PureComponent {

	static propTypes = {
		text: PropTypes.string.isRequired,
		show: PropTypes.bool,
	};

	render() {
		const { text, show } = this.props;

		return (
			<AnimatedPopup shown={show}>
				<P className="update-notice" text={text} />
			</AnimatedPopup>
		);
	}
}
