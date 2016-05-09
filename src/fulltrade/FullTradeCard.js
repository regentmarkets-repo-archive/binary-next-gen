import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { BinaryChart } from 'binary-charts';
// const BinaryChart = (props) => <div {...props} style={{ background: 'grey' }} />;
import PurchaseFailed from '../_common/PurchaseFailed';
import Modal from '../containers/Modal';
import FullTradeParams from '../trade-params/FullTradeParams';
import ContractReceiptCard from './ContractReceiptCard';
import findDeep from 'binary-utils/lib/findDeep';
import filterObjectBy from 'binary-utils/lib/filterObjectBy';
import { mockedContract } from './../_constants/MockContract';
import { internalTradeModelToServerTradeModel } from './adapters/TradeObjectAdapter';

const getStartLaterOnlyContract = contract => {
    const startLaterCategories =
        filterObjectBy(contract, child =>
            findDeep(child, descendent => descendent && !!descendent.forwardStartingDuration));

    // TODO: remove durations so that only forward starting will be select
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
        contractBought: PropTypes.object,
        index: PropTypes.number.isRequired,
        marketIsOpen: PropTypes.bool,
        trade: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
        ticks: PropTypes.array,
    };

    render() {
        const { actions, index, marketIsOpen, trade, ticks } = this.props;
        const { symbolName, lastBoughtContract } = trade;

        const contract = marketIsOpen ?
            (this.props.contract || mockedContract) :
            getStartLaterOnlyContract(this.props.contract || mockedContract);

        const disabled =
            contract === mockedContract ||
            trade.disabled;

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
                        contract={lastBoughtContract}
                        symbol={symbolName}
                        ticks={ticks}
                        trade={tradeRequiredByChart}
                        pipSize={trade.pipSize}
                    />
                </div>
                {lastBoughtContract ?
                    <ContractReceiptCard
                        actions={actions}
                        boughtContract={lastBoughtContract}
                        tradeId={index}
                    /> :
                    <FullTradeParams
                        {...this.props}
                        disabled={disabled}
                        contract={contract}
                    />
                }
            </div>
        );
    }
}
