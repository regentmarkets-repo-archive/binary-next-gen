import React, { PureComponent } from 'react';
import { Notice } from 'binary-components';

export default class ContractValidationError extends PureComponent {

	props: {
		contract: Contract,
	};

	render() {
		const { contract } = this.props;
		const validationError = contract.validation_error;

		if (!validationError) return null;

		const message = validationError.message ?
			validationError.message.split(')')[1] :
			validationError;

		return (
			<Notice text={message} />
		);
	}
}
