import React from 'react';
import { timeStr } from '../common/DateUtils';
import { Direction, NumberColored } from '../common';
import TickSparkline from './TickSparkline';

const historyDiff = (history) => {
	if (!history || history.length <= 1) return 0;

	return history[history.length - 1].quote - history[history.length - 2].quote;
};

const TicksRow = ({history, asset}) => {
	if (!asset) return <tr/>;

	const diff = historyDiff(history);
	const { quote, epoch } = history[history.length - 1] || {};

	return (
		<tr>
			<td><Direction diff={diff} /></td>
			<td>{asset.get('display_name')}</td>
			<td>{quote}</td>
			<td>{timeStr(epoch)}</td>
			<td><NumberColored value={diff.toPrecision(2)} /></td>
			<td><TickSparkline history={history} /></td>
		</tr>
	);
};

TicksRow.propTypes = {
	asset: React.PropTypes.object,
	history: React.PropTypes.array.isRequired,
};

export default TicksRow;
