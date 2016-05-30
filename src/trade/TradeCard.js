import React, { Component, PropTypes } from 'react';
import { BinaryChart } from 'binary-charts';
import findDeep from 'binary-utils/lib/findDeep';
import filterObjectBy from 'binary-utils/lib/filterObjectBy';
// const BinaryChart = (props) => <div {...props} style={{ background: 'grey' }} />;
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
        };
    }

    static defaultProps = {
        type: 'full',
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        compact: PropTypes.bool,
        currency: PropTypes.string.isRequired,
        contract: PropTypes.object,
        index: PropTypes.number.isRequired,
        marketIsOpen: PropTypes.bool,
        params: PropTypes.object.isRequired,
        pipSize: PropTypes.number.isRequired,
        proposalInfo: PropTypes.object.isRequired,
        purchaseInfo: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
        ticks: PropTypes.array,
        uiState: PropTypes.object.isRequired,
        tradingTime: PropTypes.object,
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

    render() {
        const {
            actions,
            compact,
            currency,
            index,
            marketIsOpen,
            params,
            uiState,
            purchaseInfo,
            proposalInfo,
            pipSize,
            ticks,
            tradingTime,
        } = this.props;
        const { lastBoughtContract } = purchaseInfo;
        const { symbolName } = params;

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

        return (
            <div disabled={disabled} className="trade-panel">
                <Modal
                    shown={!!purchaseInfo.buy_error}
                    onClose={() => actions.updatePurchaseInfo(index, 'buy_error', undefined)}
                >
                    <PurchaseFailed failure={purchaseInfo.buy_error} />
                </Modal>
                {/* {lastBoughtContract && <h5>{lastBoughtContract.longcode}</h5>} */}
                <div className="trade-chart-container">
                    <BinaryChart
                        id={`trade-chart${index}`}
                        className="trade-chart"
                        contract={contractRequiredByChart}
                        events={this.state.events}
                        symbol={symbolName}
                        ticks={ticks}
                        trade={!!contractRequiredByChart ? undefined : tradeRequiredByChart}
                        pipSize={pipSize}
                        rangeChange={(count, type) => actions.getDataForSymbol(params.symbol, count, type)}
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
                        actions={actions}
                        currency={currency}
                        contract={contract}
                        compact={compact}
                        contractError={propsContract ? propsContract.error : undefined}
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
