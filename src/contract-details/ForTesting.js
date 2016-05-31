import React, { PropTypes, Component } from 'react';
import ContractDetailsContainer from './ContractDetailsContainer';

export default class ForTesting extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            done: false,
        };
    }

    componentDidMount() {
        const { actions, params } = this.props;
        actions.detailsForContract(params.id).then(() => this.setState({ done: true }));
    }

    render() {
        const { actions } = this.props;
        const { done } = this.state;
        return (
            done ? <ContractDetailsContainer actions={actions} /> : null
        );
    }
}
