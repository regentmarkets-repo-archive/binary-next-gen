import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class TranslatedComponent extends Component {

	static propTypes = {
		text: PropTypes.string,
		renderer: PropTypes.object.isRequired,
	};

	static defaultProps = {
		text: '',
	};

	render() {
		const { text, renderer } = this.props;

		return (
			<FormattedMessage id={text} defaultMessage={text}>
				{renderer(message, this.props)}
			</FormattedMessage>
		);
	}
}
