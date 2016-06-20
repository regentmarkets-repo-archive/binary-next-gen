import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import RealityCheckWeb from './RealityCheckWeb';
import RealityCheckSelector from './RealityCheckSelector';

@connect(RealityCheckSelector)
export default class RealityCheckContainer extends Component {
    render() {
        return (
            <RealityCheckWeb
                {...immutableChildrenToJS(this.props)}
            />
        );
    }
}
