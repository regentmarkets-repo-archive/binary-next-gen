import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class M extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		m: PropTypes.string,
		values: PropTypes.object,
	};

	static defaultProps = {
		m: '',
	};

	render() {
		const { m, values } = this.props;

		return (
			<FormattedMessage id={m} defaultMessage={m} values={values}>
				{message =>
					<span {...this.props}>
						{message}
					</span>
				}
			</FormattedMessage>
		);
	}
}
