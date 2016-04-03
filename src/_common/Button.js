import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class Button extends Component {

	static propTypes = {
		text: PropTypes.string,
	};

	static defaultProps = {
		text: '',
	};

	render() {
		const { text } = this.props;

		return (
			<FormattedMessage id={text} defaultMessage={text}>
				{message =>
					<button {...this.props}>
						{message}
					</button>
				}
			</FormattedMessage>
		);
	}
}
