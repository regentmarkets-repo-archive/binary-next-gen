import React, { PropTypes, Component } from 'react';

export default class LogoSpinner extends Component {

	static propTypes = {
		spinning: PropTypes.bool,
	};

	render() {
		const { spinning } = this.props;
		const classNames = [spinning ? 'spinner' : null];

		return (
			<img className={classNames.join(' ')} src="img/binary-symbol-logo.svg" />
		);
	}
}
