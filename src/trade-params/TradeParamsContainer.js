import React, { PureComponent, PropTypes } from 'react';
import { immutableChildrenToJS } from 'binary-utils';
import TradeParams from './TradeParams';

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
