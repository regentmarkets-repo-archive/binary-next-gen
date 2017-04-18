import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import RealityCheckWeb from './RealityCheckWeb';
import RealityCheckSelector from './RealityCheckSelector';

@connect(RealityCheckSelector)
export default class RealityCheckContainer extends PureComponent {
    render() {
        return <RealityCheckWeb {...immutableChildrenToJS(this.props)} />;
    }
}
