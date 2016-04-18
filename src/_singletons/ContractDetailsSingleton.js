import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../containers/Modal';
import ContractDetailsContainer from '../contract-details/ContractDetailsContainer';
import ContractDetailsSingletonSelector from './ContractDetailsSingletonSelector';

@connect(ContractDetailsSingletonSelector)
export default class ContractDetailsSingleton extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        contractShown: PropTypes.string,
    };

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
