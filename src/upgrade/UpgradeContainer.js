import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpgradeCard from './UpgradeCard';

@connect(state => ({ upgrade: state.upgrade }))
export default class UpgradeContainer extends Component {
    render() {
        return <UpgradeCard {...this.props} />;
    }
}
