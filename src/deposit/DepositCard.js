import React, { PropTypes, PureComponent } from 'react';
import { M, Tab, TabList } from 'binary-components';
import { immutableChildrenToJS } from 'binary-utils';
import PaymentAgentsList from './PaymentAgentsList';
import WithdrawalForm from './WithdrawalForm';

const components = [
	PaymentAgentsList,
	WithdrawalForm,
];

export default class DepositCard extends PureComponent {
    static propTypes = {
        paymentAgent: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }

	onTabChange = idx => this.setState({ activeTab: idx });

    render() {
        const { paymentAgent, country } = this.props;
        const paymentAgents = paymentAgent.toJS().paymentAgents;

        if (paymentAgents.length === 0) {
            return (
                <div>
                    <M m="Sorry, we have no payment agents in" /> {country}
                </div>
            );
        }
        const { activeTab } = this.state;
        const ActiveComponent = components[activeTab];

        return (
            <div>
                <TabList
                    activeIndex={activeTab}
                    onChange={this.onTabChange}
                >
                    <Tab text="Asset Index" />
                    <Tab text="Trading Times" />
                </TabList>
                <ActiveComponent {...immutableChildrenToJS(this.props)} />
            </div>
        );
    }
}
