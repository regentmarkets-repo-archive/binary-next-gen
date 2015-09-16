import React from 'react';
import { shortDateStr } from '../common/DateUtils';
import Direction from '../common/Direction';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const TickRow = (props) => {
	const { tick, history } = props;

	return (
		<tr>
			<td>
				<Direction diff={tick.diff} />
			</td>
			<td>
				{tick.symbol}
			</td>
			<td>
				{tick.quote}
			</td>
			<td>
				{shortDateStr(tick.epoch)}
			</td>
			<td>
				{tick.diff.toPrecision(2)}
			</td>
			<td>
				<Sparklines data={history.map((h) => h.quote)} limit={50}>
					<SparklinesLine />
					<SparklinesSpots />
				</Sparklines>
			</td>
		</tr>
	);
};

TickRow.propTypes = {
	tick: React.PropTypes.object.isRequired,
	history: React.PropTypes.array,
};

export default TickRow;
