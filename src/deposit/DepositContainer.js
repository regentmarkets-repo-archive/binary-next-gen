import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DepositCard from './DepositCard';
import depositSelectors from './depositSelectors';

@connect(depositSelectors)
export default class DepositContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return <DepositCard {...this.props} />;
    }
}
