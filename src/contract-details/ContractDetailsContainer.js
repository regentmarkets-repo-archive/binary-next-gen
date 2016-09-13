import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import contractDetailsSelectors from './ContractDetailsSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(contractDetailsSelectors)
export default class ContractDetailsContainer extends PureComponent {

	static defaultProps = {
		chartData: {},
	};

	props: {
		contract: Contract,
	};

	render() {
		return (
			<ContractDetailsCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
