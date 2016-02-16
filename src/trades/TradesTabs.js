import React, { PropTypes } from 'react';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';
// import TradePanel from '../fulltrade/TradePanel';

export default class TradesTabs extends React.Component {

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
        );
    }
}
