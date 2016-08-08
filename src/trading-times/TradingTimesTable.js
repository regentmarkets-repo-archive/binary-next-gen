import React, { PropTypes, PureComponent } from 'react';
import { isMobile } from 'binary-utils';
import { Th } from 'binary-components';
import TradingTimesRow from './TradingTimesRow';

export default class TradingTimesTable extends PureComponent {

	static propTypes = {
		times: PropTypes.array.isRequired,
	};

	render() {
		const { times } = this.props;
		const compact = isMobile();

		return (
			<table>
				<thead>
					<tr>
						<Th className="textual" text="Asset" />
						<Th className="date" text="Opens" />
						<Th className="date" text="Closes" />
						<Th className="date" text="Settles" />
						{!compact && <Th className="textual" text="Upcoming Events" />}
					</tr>
				</thead>
				<tbody>
					{times.map(t =>
						<TradingTimesRow
							key={t.symbol}
							assetName={t.name}
							times={t.times}
							events={t.events}
							compact={compact}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
