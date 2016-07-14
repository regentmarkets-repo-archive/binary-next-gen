import React, { PropTypes, PureComponent } from 'react';
import M from 'binary-components/lib/M';

export default class ContractDetailCustom extends PureComponent {

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
