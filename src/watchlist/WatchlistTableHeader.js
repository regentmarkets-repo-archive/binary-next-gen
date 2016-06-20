import React, { Component } from 'react';
import Th from 'binary-components/lib/Th';

export default class WatchlistTableHeader extends Component {
	render() {
		return (
			<thead>
				<tr>
					<Th text="Asset" />
					<Th text="Spot" />
					<Th text="Change" />
					<Th text="Chart" />
					<th />
				</tr>
			</thead>
		);
	}
}
