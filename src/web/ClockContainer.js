import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import shouldPureComponentUpdate from 'react-pure-render/function';
import Clock from '../_common/Clock';
import timeSelector from './timeSelector';

@connect(timeSelector)
export default class ClockContainer extends Component {

    shouldPureComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <Clock {...immutableChildrenToJS(this.props)} />
        );
    }
}
