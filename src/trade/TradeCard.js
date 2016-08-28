import React, { PureComponent, PropTypes } from 'react';
import { immutableChildrenToJS } from 'binary-utils';
import { Button, P } from 'binary-components';
import { actions } from '../_store';
import TradeViewChart from './trade-chart/TradeViewChart';
import TradeParams from '../trade-params/TradeParams';
import ContractReceipt from '../contract-details/ContractReceipt';
import ContractDetailsMobileLayout from '../contract-details/mobile/ContractDetailsMobileLayout';
import SellAtMarketButton from '../contract-details/SellAtMarketButton';
import ContractWinLose from '../contract-details/ContractWinLose';

type Props = {
    compact: boolean,
    contractReceiptProps: Object,
    chartProps: Object,
    index: number,
    paramsProps: Object,
};


export default class TradeCard extends PureComponent {

    props: Props;

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

    constructor(props: Props) {
        super(props);
        this.toFireZoomEvent = false;
    }

    componentDidUpdate(prevProps) {
        // ugly hack to ensure event is fire after chart is back to trade view
        if (prevProps.contractReceiptProps && !this.props.contractReceiptProps && this.toFireZoomEvent) {
            this.fireZoomEvent();
            this.toFireZoomEvent = false;
        }
    }

    tradeAgain = () => {
        const { index } = this.props;
        actions.closeContractReceipt(index);
        this.toFireZoomEvent = true;
    }

    fireZoomEvent = () => {
        const { index } = this.props;
        const domID = `trade-chart${index}`;
        const zoomToLatestEv = new CustomEvent('zoom-to-latest');
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

        const tradeParamsComponent = paramsProps.tradeParams && (
            <TradeParams
                {...immutableChildrenToJS(paramsProps)}
                compact={compact}
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
