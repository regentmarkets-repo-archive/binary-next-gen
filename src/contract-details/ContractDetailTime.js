import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import epochToDate from 'binary-utils/lib/epochToDate';
import dateToGMTString from 'binary-utils/lib/dateToGMTString';
import contractCodeToText from 'binary-utils/lib/contractCodeToText';

const epochToGMTString = epoch => dateToGMTString(epochToDate(epoch));

export default class ContractDetailTime extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		code: PropTypes.string.isRequired,
	};

	render() {
		const { contract, code } = this.props;

		return (
			<div className="contract-detail">
				<M m={contractCodeToText(code)} />
				{contract[code] ? epochToGMTString(contract[code]) : '–'}
			</div>
		);
	}
}
