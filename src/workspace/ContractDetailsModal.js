import React, { PropTypes, Component } from 'react';
import Modal from '../containers/Modal';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ContractDetailsContainer from '../contract-details/ContractDetailsContainer';

export default class ContractDetailsModal extends Component {
    static contextTypes = {
        router: React.PropTypes.object,
    };

    static defaultProps = {
        params: {},
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    closeModal() {
        const { router } = this.context;
        router.goBack();
    }

    render() {
        const { actions, params } = this.props;
        return (
            <Modal
                shown={!!params.id}
                onClose={::this.closeModal}
            >
                {params.id &&
                <ContractDetailsContainer
                    actions={actions}
                    params={params}
                />}
            </Modal>
        );
    }
}
