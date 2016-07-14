import React, { PureComponent, PropTypes } from 'react';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import { actions } from '../_store';
import TradeViewChart from './trade-chart/TradeViewChart';
import TradeParams from '../trade-params/TradeParams';
import ContractReceipt from '../contract-details/ContractReceipt';
import ContractDetailsMobileLayout from '../contract-details/mobile/ContractDetailsMobileLayout';
import SellAtMarketButton from '../contract-details/SellAtMarketButton';
import ContractValidationError from '../contract-details/ContractValidationError';
import ContractWinLose from '../contract-details/ContractWinLose';
import Button from 'binary-components/lib/Button';
import P from 'binary-components/lib/P';

export default class TradeCard extends PureComponent {
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
        if (contractReceiptInJS && Object.keys(contractReceiptInJS).length === 0) {
            return <P text="Asset not available" />;
        }

        const chartComponent = (
            <div className="trade-chart-container">
                <TradeViewChart {...immutableChildrenToJS(chartProps)} />
            </div>
        );

        const detailsComponent = contractReceiptInJS && (
            <ContractReceipt
                contract={contractReceiptInJS}
                showLongcode
                onTradeAgainClicked={this.tradeAgain}
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
                    <ContractDetailsMobileLayout
                        contract={contractReceiptInJS}
                        chartComponent={
                            <div>
                                {chartComponent}
                                <ContractWinLose contract={contractReceiptInJS} />
                                <SellAtMarketButton contract={contractReceiptInJS} />
                                <ContractValidationError contract={contractReceiptInJS} />
                                <Button
                                    className="buy-again-btn"
                                    text="Trade Again"
                                    onClick={this.tradeAgain}
                                />
                            </div>
                        }
                        detailsComponent={detailsComponent}
                        onTradeAgainClicked={this.tradeAgain}
                    />
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
