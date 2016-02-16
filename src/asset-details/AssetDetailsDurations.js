import React, { PropTypes } from 'react';

export default class AssetDetailsTradingTimes extends React.Component {

	static propTypes = {
		activeAsset: PropTypes.object,
	};

	render() {
		return (
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Ticks</th>
						<th>Seconds</th>
						<th>Minutes</th>
						<th>Hours</th>
						<th>Days</th>
					</tr>
				</thead>
				<tbody>
					<tr><td>Up/Down</td><td colSpan="5" /></tr>
					<tr><td>Touch/No Touch</td><td colSpan="5" /></tr>
					<tr><td>Ends In/Out</td><td colSpan="5" /></tr>
					<tr><td>Stays In/Goes Out</td><td colSpan="5" /></tr>
				</tbody>
			</table>
		);
	}
}
