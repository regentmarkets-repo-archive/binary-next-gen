import React from 'react';
import { timeStr } from '../common/DateUtils';
import { Direction, NumberColored } from '../common';
import TickSparkline from './TickSparkline';

const historyDiff = (history) => {
	if (!history || history.length <= 1) return 0;

	return history[history.length - 1].quote - history[history.length - 2].quote;
};

export default class WatchlistRow extends React.Component {

	static propTypes = {
		asset: React.PropTypes.object.isRequired,
		compact: React.PropTypes.bool.isRequired,
		history: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.asset !== this.props.asset ||
			nextProps.history !== this.props.history;
	}

	render() {
		const {asset, compact} = this.props;
		if (!asset) return <tr/>;

		const history = this.props.history.toJS();
		const diff = historyDiff(history);
		const { quote, epoch } = history[history.length - 1] || {};

		return (
			<tr>
				<td><Direction diff={diff} /></td>
				<td>{asset.get('display_name')}</td>
				<td>{quote}</td>
				{!compact && <td>{timeStr(epoch)}</td>}
				<td><NumberColored value={diff.toPrecision(2)} /></td>
				<td><TickSparkline history={history} /></td>
			</tr>
		);
	}
}
