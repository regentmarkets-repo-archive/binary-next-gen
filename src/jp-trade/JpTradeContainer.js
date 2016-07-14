import React, { PureComponent } from 'react';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import JpTradeCard from './JpTradeCard';

export default class JpTradeContainer extends PureComponent {

    render() {
        return (
            <JpTradeCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
