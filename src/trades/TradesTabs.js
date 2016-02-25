import React, { PropTypes, Component } from 'react';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';
// import FullTradeCard from '../fulltrade/FullTradeCard';

export default class TradesTabs extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
        ticks: PropTypes.object.isRequired,
    };

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

    render() {
        const { trades } = this.props;

        return (
            <div className="trades-tabs">
                <TabList
                    activeIndex={this.state.activeTab}
                    onChange={idx => this.setState({ activeTab: idx })}
                >
                    {trades.map((trade, index) =>
                        <Tab
                            key={index}
                            text={trade.symbol}
                        />
                    )}
                </TabList>
            </div>
        );
    }
}
