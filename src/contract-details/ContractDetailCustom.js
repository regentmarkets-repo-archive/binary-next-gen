import React, { PropTypes, Component } from 'react';
import M from '../_common/M';

export default class ContractDetailCustom extends Component {

	static propTypes = {
		label: PropTypes.string.isRequired,
		value: PropTypes.string,
	};

	render() {
		const { label, value } = this.props;

		return (
			<div className="contract-detail">
				<M m={label} />
				<span>{value || '–'}</span>
			</div>
		);
	}
}
