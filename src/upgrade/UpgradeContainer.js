import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UpgradeCard from './UpgradeCard';

@connect(state => ({ ...state.upgrade.toJS() }))
export default class UpgradeContainer extends PureComponent {
    render() {
        return <UpgradeCard {...this.props} />;
    }
}
