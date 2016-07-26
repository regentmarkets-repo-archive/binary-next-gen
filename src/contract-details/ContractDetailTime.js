import React, { PropTypes, PureComponent } from 'react';
import M from 'binary-components/lib/M';
import { epochToDate, dateToGMTString, contractCodeToText } from 'binary-utils';

const epochToGMTString = epoch => dateToGMTString(epochToDate(epoch));

export default class ContractDetailTime extends PureComponent {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		code: PropTypes.string.isRequired,
	};

	render() {
		const { contract, code } = this.props;

		return (
			<div className="contract-detail">
				<M m={contractCodeToText(code)} />
				<span>{contract[code] ? epochToGMTString(contract[code]) : '–'}</span>
			</div>
		);
	}
}
