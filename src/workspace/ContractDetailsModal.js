import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../_store';
import Modal from '../containers/Modal';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ContractDetailsContainer from '../contract-details/ContractDetailsContainer';
import ContractDetailsModalSelector from './ContractDetailsModalSelector';

@connect(ContractDetailsModalSelector)
export default class ContractDetailsModal extends Component {

    static propTypes = {
        contractShown: PropTypes.string,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    hideDetails = () =>
        actions.detailsForContract();

    render() {
        const { contractShown } = this.props;
        return (
            <Modal
                shown={!!contractShown}
                onClose={this.hideDetails}
            >
                {contractShown &&
                <ContractDetailsContainer
                    params={{ id: contractShown }}
                />}
            </Modal>
        );
    }
}
