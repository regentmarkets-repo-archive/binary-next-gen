import React, { PureComponent } from 'react';
import { M } from 'binary-components';
import { contractCodeToText } from 'binary-utils';

export default class ContractDetailString extends PureComponent {

	props: {
		contract: Contract,
		code: string,
	};

	render() {
		const { contract, code } = this.props;

		return (
			<div className="contract-detail">
				<M m={contractCodeToText(code)} />
				<span>{contract[code] || '–'}</span>
			</div>
		);
	}
}
