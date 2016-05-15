import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { BinaryChart } from 'binary-charts';
import findDeep from 'binary-utils/lib/findDeep';
import filterObjectBy from 'binary-utils/lib/filterObjectBy';
// const BinaryChart = (props) => <div {...props} style={{ background: 'grey' }} />;
import PurchaseFailed from '../_common/PurchaseFailed';
import Button from '../_common/Button';
import Modal from '../containers/Modal';
import FullTradeParams from '../trade-params/FullTradeParams';
import ContractDetailsReceipt from '../contract-details/ContractDetailsReceipt';
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

export default class FullTradeCard extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

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

        return (
            <div disabled={disabled} className={'trade-panel'}>
                <Modal
                    shown={!!purchaseInfo.buy_error}
                    onClose={() => actions.updatePurchaseInfo(index, 'buy_error', undefined)}
                >
                    <PurchaseFailed failure={purchaseInfo.buy_error} />
                </Modal>
                <div className="trade-chart-container">
                    <BinaryChart
                        className="trade-chart"
                        contract={contractRequiredByChart}
                        symbol={symbolName}
                        ticks={ticks}
                        trade={tradeRequiredByChart}
                        pipSize={pipSize}
                        rangeChange={(count, type) => actions.getDataForSymbol(params.symbol, count, type)}
                        tradingTime={tradingTime}
                    />
                </div>
                {lastBoughtContract ?
                    <div>
                        <ContractDetailsReceipt
                            actions={actions}
                            contract={lastBoughtContract}
                        />
                        <Button
                            className="buy-again-btn"
                            text="Trade Again"
                            onClick={() => actions.closeContractReceipt(index)}
                        />
                    </div> :
                    <FullTradeParams
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
                    />
                }
            </div>
        );
    }
}
