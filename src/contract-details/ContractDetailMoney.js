import React, { PureComponent } from 'react';
import { contractCodeToText } from 'binary-utils';
import { M, NumberPlain } from 'binary-components';

export default class ContractDetailMoney extends PureComponent {

	props: {
		contract: Contract,
		code: string,
	};

	render() {
		const { contract, code } = this.props;

		return (
			<div className="contract-detail">
				<M m={contractCodeToText(code)} />
				{contract[code] ?
					<NumberPlain
						value={contract[code]}
						currency={contract.currency}
						digits={contract.fractionalDigits}
					/> :
					<span>–</span>
				}
			</div>
		);
	}
}
