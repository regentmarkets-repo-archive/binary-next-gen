import React, { PropTypes, Component } from 'react';
import M from 'binary-components/lib/M';

export default class ContractDetailCustom extends Component {

	static propTypes = {
		label: PropTypes.string.isRequired,
		value: PropTypes.string,
	};

	render() {
		const { label, value } = this.props;

		if (typeof value === 'undefined') return null;

		return (
			<div className="contract-detail">
				<M m={label} />
				<span>{value}</span>
			</div>
		);
	}
}
