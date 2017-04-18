import React, { PureComponent } from 'react';
import { immutableChildrenToJS } from 'binary-utils';

import JpTradeCard from './JpTradeCard';

export default class JpTradeContainer extends PureComponent {
    render() {
        return <JpTradeCard {...immutableChildrenToJS(this.props)} />;
    }
}
