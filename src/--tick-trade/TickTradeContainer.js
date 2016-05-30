import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import TickTradeCard from './TickTradeCard';
import tickTradeSelectors from './tickTradeSelectors';

@connect(tickTradeSelectors)
export default class TickTradeContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <TickTradeCard
                index={0}
                {...immutableChildrenToJS(this.props)}
            />
        );
    }
}
