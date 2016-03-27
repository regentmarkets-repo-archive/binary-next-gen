import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { BinaryChart } from 'binary-charts';
import PurchaseFailed from '../_common/PurchaseFailed';
import Modal from '../containers/Modal';

import FullTradeParams from './FullTradeParams';
import BoughtContractCard from './BoughtContractCard';
import findIfExist from '../_utils/findIfExist';
import { mockedContract } from './../_constants/MockContract';

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
        const { actions, index, marketIsOpen, trade, ticks } = this.props;
        const selectedSymbol = trade.symbol;

        const mostRecentContractBought = trade.mostRecentContractBought;
        const contract = this.props.contract || mockedContract;

        const contractAllowStartLater = findIfExist(contract, child => child && !!child.forwardStartingDuration);

        const disabled =
            contract === mockedContract ||
            trade.disabled ||
            (!marketIsOpen && !contractAllowStartLater);

        return (
            <div disabled={disabled} className={'trade-panel'}>
                <Modal
                    shown={!!trade.buy_error}
                    onClose={() => actions.updateTradeParams(index, 'buy_error', undefined)}
                >
                    <PurchaseFailed failure={trade.buy_error} />
                </Modal>
                <BinaryChart
                    className="trade-chart"
                    symbol={selectedSymbol}
                    ticks={ticks}
                    trade={trade}
                />
                {
                    mostRecentContractBought ?
                        <BoughtContractCard
                            actions={actions}
                            boughtContract={mostRecentContractBought}
                            tradeId={index}
                        /> :
                        <FullTradeParams
                            {...this.props}
                            disabled={disabled}
                            contract={disabled ? mockedContract : contract}
                        />
                }
            </div>
        );
    }
}
