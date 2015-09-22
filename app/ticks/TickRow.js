import React from 'react';
import { shortDateStr } from '../common/DateUtils';
import Direction from '../common/Direction';
import TickSparkline from './TickSparkline';

const historyDiff = (history) => {
	if (!history || history.size <= 1) return 0;

	return history[history.length - 1].quote - history[history.length - 2].quote;
};

const TickRow = (props) => {
	const { symbol, history } = props;
	const diff = historyDiff(history);
	const { quote, epoch } = history[history.length - 1] || {};

	return (
		<tr>
			<td><Direction diff={diff} /></td>
			<td>{symbol}</td>
			<td>{quote}</td>
			<td>{shortDateStr(epoch)}</td>
			<td>{diff.toPrecision(2)}</td>
			<td><TickSparkline history={history} /></td>
		</tr>
	);
};

TickRow.propTypes = {
	symbol: React.PropTypes.string.isRequired,
	history: React.PropTypes.array.isRequired,
};

export default TickRow;
