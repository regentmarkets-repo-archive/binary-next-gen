import React, { PropTypes, PureComponent } from 'react';
import M from 'binary-components/lib/M';
import { contractCodeToText } from 'binary-utils';

export default class ContractDetailString extends PureComponent {

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
