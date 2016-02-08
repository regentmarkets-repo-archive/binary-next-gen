import React from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import shouldPureComponentUpdate from 'react-pure-render/function';
import BalanceCard from './BalanceCard';
import balanceSelectors from './balanceSelectors';

@connect(balanceSelectors)
export default class Balance extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<BalanceCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
