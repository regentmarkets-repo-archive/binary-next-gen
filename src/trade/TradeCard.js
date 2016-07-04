import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import { actions } from '../_store';
import TradeViewChart from './trade-chart/TradeViewChart';
import TradeParams from '../trade-params/TradeParams';
import ContractReceipt from '../contract-details/ContractReceipt';
import ContractDetailsMobileLayout from '../contract-details/mobile/ContractDetailsMobileLayout';
import SellAtMarketButton from '../contract-details/SellAtMarketButton';
import ContractValidationError from '../contract-details/ContractValidationError';
import Button from 'binary-components/lib/Button';

export default class TradeCard extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

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

    sellAtMarket = () => {
        const { contractReceiptProps } = this.props;
        actions.sellContract(contractReceiptProps.toJS().contract_id, 0);
    }

    render() {
        const { chartProps, contractReceiptProps, compact, paramsProps } = this.props;
        const contractReceiptInJS = contractReceiptProps && contractReceiptProps.toJS();
        const chartComponent = (
            <div className="trade-chart-container">
                <TradeViewChart {...immutableChildrenToJS(chartProps)} />
            </div>
        );

        const detailsComponent = contractReceiptInJS && (
            <ContractReceipt
                contract={contractReceiptInJS}
                showLongcode
            />
        );

        const tradeParamsComponent = (
            <TradeParams
                {...immutableChildrenToJS(paramsProps)}
                compact={compact}
                onPurchaseHook={this.zoomWhenPurchase}
                style={contractReceiptInJS ? { display: 'none' } : undefined}
            />
        );

        const mobileTrade = compact && (
            <div className="trade-panel">
                {contractReceiptInJS &&
                    <div>
                        <ContractDetailsMobileLayout
                            chartComponent={chartComponent}
                            detailsComponent={detailsComponent}
                        />
                        <SellAtMarketButton
                            contract={contractReceiptInJS}
                            onClick={this.sellAtMarket}
                        />
                        <ContractValidationError contract={contractReceiptInJS} />
                        <Button text="Trade Again" onClick={this.tradeAgain} />
                    </div>
                }
                {!contractReceiptInJS && chartComponent}
                {tradeParamsComponent}

            </div>
        );

        const desktopTrade = !compact && (
            <div className="trade-panel">
                {chartComponent}
                {detailsComponent}
                {tradeParamsComponent}
            </div>
        );
        return compact ? mobileTrade : desktopTrade;
    }
}
