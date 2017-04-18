import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import DigitStatsCard from './DigitStatsCard';
import digitStatsSelectors from './digitStatsSelectors';

@connect(digitStatsSelectors)
export default class DigitStatsContainer extends PureComponent {
    render() {
        return <DigitStatsCard {...immutableChildrenToJS(this.props)} />;
    }
}
