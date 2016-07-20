import React, { Component, PropTypes } from 'react';
import TradeParams from './TradeParams';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

export default class TradeParamsContainer extends Component {
    static propTypes = {
        compact: PropTypes.bool,
        paramsProps: PropTypes.object.isRequired,
    };

    render() {
        const { compact, paramsProps } = this.props;
        return (
            <TradeParams compact={compact} {...immutableChildrenToJS(paramsProps)} />
        );
    }
}
