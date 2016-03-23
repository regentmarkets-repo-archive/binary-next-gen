import React, { Component, PropTypes } from 'react';
import ContractDetailsCard from '../contract-details/ContractDetailsCard';
import M from '../_common/M';

export default class BoughtContractCard extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        boughtContract: PropTypes.object.isRequired,
        tradeId: PropTypes.number.isRequired,
    };

    render() {
        const { actions, boughtContract, tradeId } = this.props;
        return (
            <div>
                <ContractDetailsCard actions={actions} contract={boughtContract} />
                <button onClick={() => actions.updateTradeParams(tradeId, 'mostRecentContractId', undefined)}>
                    <M m="Go back" />
                </button>
            </div>
        );
    }
}
