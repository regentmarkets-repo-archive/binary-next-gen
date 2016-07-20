import React, { Component } from 'react';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import JpTradeCard from './JpTradeCard';

export default class JpTradeContainer extends Component {

    render() {
        return (
            <JpTradeCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
