import React, { PropTypes, Component } from 'react';
import M from 'binary-components/lib/M';
import contractCodeToText from 'binary-utils/lib/contractCodeToText';

export default class ContractDetailString extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		code: PropTypes.string.isRequired,
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
