import React, { Component } from 'react';
import Th from 'binary-components/lib/Th';

export default class WatchlistTableHeader extends Component {
	render() {
		return (
			<thead>
				<tr>
					<Th className="textual" text="Asset" />
					<Th className="numeric" text="Spot" />
					<Th className="numeric" text="Change" />
					<Th text="Chart" />
					<th />
				</tr>
			</thead>
		);
	}
}
