import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import tradeListSelectors from './tradeListSelectors';
import TradesLayouts from './TradesLayouts';

@connect(tradeListSelectors)
export default class TradesContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return <TradesLayouts {...immutableChildrenToJS(this.props)} />;
    }
}
