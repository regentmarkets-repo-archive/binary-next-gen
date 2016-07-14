import React, { PropTypes, PureComponent } from 'react';

export default class ContractValidationError extends PureComponent {

	static propTypes = {
		contract: PropTypes.object.isRequired,
	};

	render() {
		const { contract } = this.props;
		const validationError = contract.validation_error;

		if (!validationError) return null;

		const message = validationError.message ?
			validationError.message.split(')')[1] :
			validationError;

		return (
			<div className="notice-msg">{message}</div>
		);
	}
}
