import React, { PropTypes, Component } from 'react';

export default class ContractValidationError extends Component {

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
			<div>{message}</div>
		);
	}
}
