import React, { Component, PropTypes } from 'react';
import ContractDetailsCard from '../contract-details/ContractDetailsCard';
import Button from '../_common/Button';

export default class ContractReceiptCard extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        boughtContract: PropTypes.object.isRequired,
        tradeId: PropTypes.number.isRequired,
    };

    render() {
        const { actions, boughtContract, tradeId } = this.props;

        return (
            <div className="contract-receipt-container">
                <ContractDetailsCard className="trade-panel-receipt" actions={actions} contract={boughtContract} />
                <Button
                    className="buy-again-btn"
                    text="Trade Again"
                    onClick={() => actions.closeContractReceipt(tradeId)}
                />
            </div>
        );
    }
}
