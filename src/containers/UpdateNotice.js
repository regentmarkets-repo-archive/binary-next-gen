import React, { PropTypes, PureComponent } from 'react';
import { M, P } from 'binary-components';

export default class UpdateNotice extends PureComponent {

	static propTypes = {
		img: PropTypes.string.isRequired,
		title: PropTypes.string,
		text: PropTypes.string.isRequired,
	};

	render() {
		const { img, title, text } = this.props;

		return (
			<div className="update-notice">
				<img src={img} alt={title} />
				{title && <h5><M m={title} /></h5>}
				<P text={text} />
			</div>
		);
	}
}
