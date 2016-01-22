import React from 'react';
import { connect } from 'react-redux';
import UpgradeCard from './UpgradeCard';

@connect(state => ({ upgrade: state.upgrade }))
export default class UpgradeContainer extends React.Component {
    render() {
        return <UpgradeCard {...this.props} />;
    }
}
