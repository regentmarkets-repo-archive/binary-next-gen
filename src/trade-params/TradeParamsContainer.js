import React, { PureComponent, PropTypes } from 'react';
import TradeParams from './TradeParams';
import { immutableChildrenToJS } from 'binary-utils';

export default class TradeParamsContainer extends PureComponent {
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
