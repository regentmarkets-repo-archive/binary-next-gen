import React, { PureComponent } from 'react';
import { M } from 'binary-components';

export default class ContractDetailCustom extends PureComponent {

	props: {
		label: string,
		value: string,
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
