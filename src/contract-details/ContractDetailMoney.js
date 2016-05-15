import React, { PropTypes, Component } from 'react';
import contractCodeToText from 'binary-utils/lib/contractCodeToText';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';

export default class ContractDetailMoney extends Component {

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
					/> : '–'}
			</div>
		);
	}
}
