import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeParams from '../trade-params/TradeParams';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

export default class TradeParamsContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        paramsProps: PropTypes.object.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <TradeParams actions={this.props.actions} {...(immutableChildrenToJS(this.props.paramsProps))} />
        );
    }
}

