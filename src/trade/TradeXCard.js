import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import { actions } from '../_store';
import TradeViewChart from './trade-chart/TradeViewChart';
import TradeParams from '../trade-params/TradeParams';
import ContractReceipt from '../contract-details/ContractReceipt';

export default class TradeXCard extends Component {

    static propTypes = {
        compact: PropTypes.bool,
        contractReceiptProps: PropTypes.object,
        chartProps: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        paramsProps: PropTypes.object.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    tradeAgain = () => {
        const { index } = this.props;
        actions.closeContractReceipt(index);
    }

    zoomWhenPurchase = () => {
        const { index } = this.props;
        const domID = `trade-chart${index}`;
        const zoomToLatestEv = new Event('zoom-to-latest');
        document.getElementById(domID).dispatchEvent(zoomToLatestEv);
    }

    render() {
        const { chartProps, contractReceiptProps, compact, paramsProps } = this.props;
        return (
            <div className="trade-panel">
                <div className="trade-chart-container">
                    <TradeViewChart {...immutableChildrenToJS(chartProps)} />
                </div>
                {contractReceiptProps &&
                    <ContractReceipt
                        contract={contractReceiptProps.toJS()}
                        showLongcode
                        onTradeAgainClicked={this.tradeAgain}
                    />
                }
                <TradeParams
                    {...immutableChildrenToJS(paramsProps)}
                    compact={compact}
                    onPurchaseHook={this.zoomWhenPurchase}
                    style={contractReceiptProps ? { display: 'none' } : undefined}
                />
            </div>
        );
    }
}
