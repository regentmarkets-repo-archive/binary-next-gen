import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeParams from './TradeParams';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

export default class TradeParamsContainer extends Component {
    static propTypes = {
        compact: PropTypes.bool,
        paramsProps: PropTypes.object.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { compact, paramsProps } = this.props;
        return (
            <TradeParams compact={compact} {...immutableChildrenToJS(paramsProps)} />
        );
    }
}
