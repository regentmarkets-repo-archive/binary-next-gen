import React, { PropTypes, PureComponent } from 'react';
import { contractCodeToText } from 'binary-utils';
import { M, NumberPlain } from 'binary-components';

export default class ContractDetailMoney extends PureComponent {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		code: PropTypes.string,
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
					/> :
					<span>–</span>
				}
			</div>
		);
	}
}
