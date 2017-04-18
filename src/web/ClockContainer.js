import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { Clock } from 'binary-components';
import timeSelector from './timeSelector';

@connect(timeSelector)
export default class ClockContainer extends PureComponent {
    render() {
        return <Clock {...immutableChildrenToJS(this.props)} />;
    }
}
