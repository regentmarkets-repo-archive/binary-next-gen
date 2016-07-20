import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import Clock from 'binary-components/lib/Clock';
import timeSelector from './timeSelector';

@connect(timeSelector)
export default class ClockContainer extends Component {

    render() {
        return (
            <Clock {...immutableChildrenToJS(this.props)} />
        );
    }
}
