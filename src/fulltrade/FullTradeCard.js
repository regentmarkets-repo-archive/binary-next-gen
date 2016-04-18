import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { BinaryChart } from 'binary-charts';
import PurchaseFailed from '../_common/PurchaseFailed';
import Modal from '../containers/Modal';
import FullTradeParams from '../trade-params/FullTradeParams';
import BoughtContractCard from './BoughtContractCard';
import findIfExist from 'binary-utils/lib/findIfExist';
import { mockedContract } from './../_constants/MockContract';
import { internalTradeModelToServerTradeModel } from './adapters/TradeObjectAdapter';

export default class FullTradeCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static defaultProps = {
        type: 'full',
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        contract: PropTypes.object,
        contractBought: PropTypes.object,
        index: PropTypes.number.isRequired,
        marketIsOpen: PropTypes.bool,
        trade: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
        ticks: PropTypes.array,
    };

    render() {
        const { actions, contract, index, marketIsOpen, trade, ticks } = this.props;
        const { selectedSymbol, mostRecentContractBought } = trade;

        const shownContract = mostRecentContractBought || contract || mockedContract;

        const contractAllowStartLater = findIfExist(contract, child => child && !!child.forwardStartingDuration);

        const disabled =
            contract === mockedContract ||
            trade.disabled ||
            (!marketIsOpen && !contractAllowStartLater);

        // TODO: remove usage of adapter so we have a consistent model
        const tradeRequiredByChart = internalTradeModelToServerTradeModel(trade);

        return (
            <div disabled={disabled} className={'trade-panel'}>
                <Modal
                    shown={!!trade.buy_error}
                    onClose={() => actions.updateTradeParams(index, 'buy_error', undefined)}
                >
                    <PurchaseFailed failure={trade.buy_error} />
                </Modal>
                <div className="trade-chart-container">
                    <BinaryChart
                        className="trade-chart"
                        contract={shownContract}
                        symbol={selectedSymbol}
                        ticks={ticks}
                        trade={tradeRequiredByChart}
                    />
                </div>
                {mostRecentContractBought ?
                    <BoughtContractCard
                        actions={actions}
                        boughtContract={shownContract}
                        tradeId={index}
                    /> :
                    <FullTradeParams
                        {...this.props}
                        disabled={disabled}
                        contract={shownContract}
                    />
                }
            </div>
        );
    }
}
