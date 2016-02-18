import React, { Component } from 'react';
import M from '../_common/M';

export default class WatchlistTableHeader extends Component {
	render() {
		return (
			<thead>
				<tr>
					<th>
						<M m="Asset" />
					</th>
					<th>
						<M m="Spot" />
					</th>
					<th>
						<M m="Change" />
					</th>
					<th>
						<M m="Chart" />
					</th>
				</tr>
			</thead>
		);
	}
}
