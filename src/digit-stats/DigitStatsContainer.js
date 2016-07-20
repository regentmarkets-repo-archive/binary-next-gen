import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import DigitStatsCard from './DigitStatsCard';
import digitStatsSelectors from './digitStatsSelectors';

@connect(digitStatsSelectors)
export default class DigitStatsContainer extends Component {

    render() {
        return (
            <DigitStatsCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
