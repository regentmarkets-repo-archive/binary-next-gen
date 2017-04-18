import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import BalanceCard from './BalanceCard';
import balanceSelectors from './balanceSelectors';

@connect(balanceSelectors)
export default class Balance extends PureComponent {
    render() {
        return <BalanceCard {...immutableChildrenToJS(this.props)} />;
    }
}
