import React, { PureComponent } from 'react';
import { P } from 'binary-components';
import AnimatedPopup from './AnimatedPopup';

export default class UpdateNotice extends PureComponent {

	props: {
		text: string,
		show: boolean,
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
