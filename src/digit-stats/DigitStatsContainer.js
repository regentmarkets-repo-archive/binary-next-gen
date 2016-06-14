import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import DigitStatsCard from './DigitStatsCard';
import digitStatsSelectors from './digitStatsSelectors';

@connect(digitStatsSelectors)
export default class DigitStatsContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <DigitStatsCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
