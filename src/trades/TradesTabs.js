import React, { PropTypes } from 'react';
import { Tabs } from '../_common';
import TradePanel from '../fulltrade/TradePanel';

export default class TradesTabs extends React.Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.object.isRequired,
        contracts: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        trades: PropTypes.object.isRequired,
        tradesIds: PropTypes.array.isRequired,
        ticks: PropTypes.object.isRequired,
    };

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

    createTrade() {
        const { tradesIds, actions } = this.props;

        const maxId = tradesIds.reduce((a, b) => Math.max(a, b), -1);
        actions.initTrade(maxId.toString());
    }

    render() {
        const { trades, tradesIds, contracts, ticks } = this.props;

        const tabs = tradesIds.map(id => ({
            text: trades[id].symbol,
            component: () => {
                const symbol = trades[id].symbol;
                const contract = contracts[symbol];
                const tick = ticks[symbol];

                if (contract && tick) {
                    return (
                        <TradePanel
                            key={id}
                            id={id}
                            contract={contract}
                            tick={tick}
                            trade={trades[id]}
                            {...this.props}
                        />
                    );
                }
            },
        }));

        const plusTab = { text: '+' };

        return (
            <Tabs
				id="trades"
				activeIndex={this.state.activeTab}
				onChange={idx => this.setState({ activeTab: idx })}
				tabs={tabs.concat(plusTab)}
            />
        );
    }
}
