import React, { PropTypes, Component } from 'react';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';
// import FullTradeCard from '../fulltrade/FullTradeCard';

export default class TradesTabs extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        trades: PropTypes.object.isRequired,
        tradesIds: PropTypes.array.isRequired,
        ticks: PropTypes.object.isRequired,
    };

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

    render() {
        const { trades, tradesIds } = this.props;

        return (
            <div className="trades-tabs">
                <TabList
                    activeIndex={this.state.activeTab}
                    onChange={idx => this.setState({ activeTab: idx })}
                >
                    {tradesIds.map(id =>
                        <Tab
                            key={id}
                            text={trades[id].symbol}
                        />
                    )}
                </TabList>
            </div>
        );
    }
}
