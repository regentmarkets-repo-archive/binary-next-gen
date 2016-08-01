import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { actions } from '../_store';
import Modal from '../containers/Modal';
import ContractDetailsContainer from '../contract-details/ContractDetailsContainer';
import ContractDetailsModalSelector from './ContractDetailsModalSelector';

@connect(ContractDetailsModalSelector)
export default class ContractDetailsModal extends PureComponent {

    static propTypes = {
        contractShown: PropTypes.string,
    };

    hideDetails = () =>
        actions.detailsForContract(undefined);

    render() {
        const { contractShown } = this.props;

        return (
            <Modal
                shown={!!contractShown}
                onClose={this.hideDetails}
            >
                <ContractDetailsContainer
                    params={{ id: contractShown }}
                />
            </Modal>
        );
    }
}
