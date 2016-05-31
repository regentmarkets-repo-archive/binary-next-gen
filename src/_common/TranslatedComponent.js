import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class TranslatedComponent extends Component {

	static propTypes = {
		component: PropTypes.string.isRequired,
		text: PropTypes.string,
	};

	static defaultProps = {
		text: '',
	};

	render() {
		const { component, text } = this.props;

		return (
			<FormattedMessage id={text} defaultMessage={text}>
				{message => React.createElement(component, this.props, [message])}
			</FormattedMessage>
		);
	}
}
