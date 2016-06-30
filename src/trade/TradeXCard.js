import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeViewChart from './TradeViewChart';
import TradeParams from '../trade-params/TradeParams';

export default class TradeXCard extends Component {
    static propTypes = {
        chartProps: PropTypes.object.isRequired,
        paramsProps: PropTypes.object.isRequired,
    };
    
    render() {
        const { chartProps, paramsProps } = this.props;
        return (
            <div disabled={disabled} className="trade-panel">
                
            </div>
        )
    }
}
