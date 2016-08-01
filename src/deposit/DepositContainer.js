import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DepositCard from './DepositCard';
import depositSelectors from './depositSelectors';

@connect(depositSelectors)
export default class DepositContainer extends PureComponent {

    render() {
        return <DepositCard {...this.props} />;
    }
}
