import React, { Component, PropTypes } from 'react';
import ContractDetailsCard from '../contract-details/ContractDetailsCard';
import Button from '../_common/Button';

export default class BoughtContractCard extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        boughtContract: PropTypes.object.isRequired,
        tradeId: PropTypes.number.isRequired,
    };

    render() {
        const { actions, boughtContract, tradeId } = this.props;

        return (
            <div className="trade-params">
                <ContractDetailsCard actions={actions} contract={boughtContract} />
                <Button
                    text="Go back"
                    onClick={() => actions.updateTradeParams(tradeId, 'mostRecentContractId', undefined)}
                />
            </div>
        );
    }
}
