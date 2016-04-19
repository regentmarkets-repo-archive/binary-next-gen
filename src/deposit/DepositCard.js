import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';
import PaymentAgentsList from './PaymentAgentsList';
import WithdrawalForm from './WithdrawalForm';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

const components = [
	PaymentAgentsList,
	WithdrawalForm,
];

export default class DepositCard extends Component {
    static propTypes = {
        paymentAgent: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }

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
                    onChange={idx => this.setState({ activeTab: idx })}
                >
                    <Tab text="Asset Index" />
                    <Tab text="Trading Times" />
                </TabList>
                <ActiveComponent {...immutableChildrenToJS(this.props)} />
            </div>
        );
    }
}
