import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from '../_utils/immutableChildrenToJS';

import JpTradeCard from './JpTradeCard';

export default class JpTradeContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <JpTradeCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
