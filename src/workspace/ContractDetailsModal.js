import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../containers/Modal';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ContractDetailsContainer from '../contract-details/ContractDetailsContainer';
import ContractDetailsModalSelector from './ContractDetailsModalSelector';

@connect(ContractDetailsModalSelector)
export default class ContractDetailsModal extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        contractShown: PropTypes.string,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { actions, contractShown } = this.props;
        return (
            <Modal
                shown={!!contractShown}
                onClose={() => actions.detailsForContract(false, undefined)}
            >
                {contractShown &&
                <ContractDetailsContainer
                    actions={actions}
                    params={{ id: contractShown }}
                />}
            </Modal>
        );
    }
}
