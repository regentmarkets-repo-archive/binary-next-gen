import React, { Component, PropTypes } from 'react';
import { BinaryChart } from 'binary-charts';
import findDeep from 'binary-utils/lib/findDeep';
import filterObjectBy from 'binary-utils/lib/filterObjectBy';
import PurchaseFailed from '../_common/PurchaseFailed';
import Modal from '../containers/Modal';
import TradeParams from '../trade-params/TradeParams';
import ContractReceipt from '../contract-details/ContractReceipt';
import { mockedContract } from './../_constants/MockContract';
import {
    internalTradeModelToServerTradeModel,
    serverContractModelToChartContractModel,
} from './adapters/TradeObjectAdapter';

const getStartLaterOnlyContract = contract => {
    const startLaterCategories =
        filterObjectBy(contract, child =>
            findDeep(child, descendent => descendent && !!descendent.forwardStartingDuration));

    Object.keys(startLaterCategories).forEach(category => {
        Object.keys(startLaterCategories[category]).forEach(type => {
            if (startLaterCategories[category][type].durations) {
                delete startLaterCategories[category][type].durations;
            }
        });
    });

    return startLaterCategories;
};

// window.contracts = [];

const zoomToLatest = chart => {
    const { min, max, dataMax } = chart.xAxis[0].getExtremes();
    if (min && max) {
        const frameSize = max - min;
        chart.xAxis[0].setExtremes(dataMax - frameSize, dataMax);
    }
};

const errorToShow = errorObj => {
    const { barrierError, durationError, proposalError, purchaseError } = errorObj;

    if (barrierError) return barrierError;
    if (durationError) return durationError;
    if (proposalError) return proposalError;
    if (purchaseError) return purchaseError;

    return undefined;
};

const chartToDataType = {
    area: 'ticks',
    candlestick: 'candles',
};

export default class TradeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    type: 'zoom-to-latest',
                    handler: zoomToLatest,
                },
            ],
            chartType: 'area',
            dataType: 'ticks',
        };
    }

    static defaultProps = {
        type: 'full',
        feedLicense: '',
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        compact: PropTypes.bool,
        currency: PropTypes.string.isRequired,
        contract: PropTypes.object,
        index: PropTypes.number.isRequired,
        feedLicense: PropTypes.string,
        marketIsOpen: PropTypes.bool,
        ohlc: PropTypes.array,
        params: PropTypes.object.isRequired,
        pipSize: PropTypes.number.isRequired,
        proposalInfo: PropTypes.object.isRequired,
        purchaseInfo: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
        ticks: PropTypes.array,
        uiState: PropTypes.object.isRequired,
        tradingTime: PropTypes.object,
        tradeErrors: PropTypes.object.isRequired,
    };

    shouldComponentUpdate(nextProps) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    zoomWhenPurchase() {
        const { index } = this.props;
        const domID = `trade-chart${index}`;
        const zoomToLatestEv = new Event('zoom-to-latest');
        document.getElementById(domID).dispatchEvent(zoomToLatestEv);
    }

    changeChartType(type) {
        const { actions, params } = this.props;
        const { chartType } = this.state;

        if (chartType === type) {
            return;
        }

        const newDataType = chartToDataType[type];
        actions.getDataForSymbol(params.symbol, 1, 'hour', newDataType, true);
        this.setState({ chartType: type, dataType: newDataType });
    }

    render() {
        const {
            actions,
            compact,
            currency,
            index,
            feedLicense,
            marketIsOpen,
            params,
            uiState,
            ohlc,
            purchaseInfo,
            proposalInfo,
            pipSize,
            ticks,
            tradingTime,
            tradeErrors,
        } = this.props;
        const { lastBoughtContract } = purchaseInfo;
        const { symbolName } = params;

        const { events, dataType, chartType } = this.state;
        const data = dataType === 'candles' ? ohlc : ticks;

        const propsContract = this.props.contract;
        let contract = (propsContract && !propsContract.error) ? propsContract : mockedContract;
        if (!marketIsOpen) {
            contract = getStartLaterOnlyContract(contract);
        }

        const disabled =
            contract === mockedContract ||
            uiState.disabled;

        // TODO: remove usage of adapter so we have a consistent model
        const tradeRequiredByChart = internalTradeModelToServerTradeModel(params);
        const contractRequiredByChart = lastBoughtContract &&
            serverContractModelToChartContractModel(lastBoughtContract);
        // if (contractRequiredByChart) window.contracts.push(contractRequiredByChart);

        // contract error is not tied to trade, but symbol, thus not in tradeErrors
        const tradeError = (propsContract ? propsContract.error : undefined) || errorToShow(tradeErrors);

        return (
            <div disabled={disabled} className="trade-panel">
                <Modal
                    shown={!!tradeErrors.purchaseError}
                    onClose={() => actions.updateTradeError(index, 'purchaseError', undefined)}
                >
                    <PurchaseFailed failure={tradeErrors.purchaseError} />
                </Modal>
                {/* {lastBoughtContract && <h5>{lastBoughtContract.longcode}</h5>} */}
                <div className="trade-chart-container">
                    <BinaryChart
                        id={`trade-chart${index}`}
                        className="trade-chart"
                        contract={contractRequiredByChart}
                        events={events}
                        noData={feedLicense === 'chartonly'}
                        pipSize={pipSize}
                        rangeChange={(count, type) => actions.getDataForSymbol(params.symbol, count, type, dataType)}
                        symbol={symbolName}
                        ticks={data}
                        type={chartType}
                        trade={!!contractRequiredByChart ? undefined : tradeRequiredByChart}
                        typeChange={feedLicense !== 'chartonly' && ::this.changeChartType}
                        tradingTime={tradingTime}
                    />
                </div>
                {lastBoughtContract ?
                    <ContractReceipt
                        actions={actions}
                        contract={lastBoughtContract}
                        onTradeAgainClicked={() => actions.closeContractReceipt(index)}
                    /> :
                    <TradeParams
                        {...proposalInfo}
                        error={tradeError}
                        proposalError={tradeErrors.proposalError}
                        actions={actions}
                        currency={currency}
                        contract={contract}
                        compact={compact}
                        disabled={disabled}
                        index={index}
                        pipSize={pipSize}
                        tradeParams={params}
                        ticks={ticks}
                        onPurchaseHook={::this.zoomWhenPurchase}
                    />
                }
            </div>
        );
    }
}
