import React, { PureComponent } from 'react';
import { immutableChildrenToJS } from 'binary-utils';
import TradeParams from './TradeParams';

export default class TradeParamsContainer extends PureComponent {
    props: {
        compact: boolean,
        paramsProps: object,
    };

    render() {
        const { compact, paramsProps } = this.props;
        return (
            <TradeParams
                compact={compact}
                {...immutableChildrenToJS(paramsProps)}
            />
        );
    }
}
