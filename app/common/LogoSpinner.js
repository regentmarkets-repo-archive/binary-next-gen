import React from 'react';

export default class LogoSpinner {

	static propTypes = {
        spinning: React.PropTypes.bool,
    };

	render() {
		const classNames = ['form-logo', this.props.spinning ? 'spinner' : null];

		return (
			<img className={classNames.join(' ')} src="https://static.binary.com/images/pages/binary-symbol-logo.svg"/>
		);
	}
}
