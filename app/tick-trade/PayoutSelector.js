import React from 'react';

export default class TickTradeCard extends React.Component {

	static propTypes = {
		type: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
		tickTrade: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

	render() {

		return (
			<div>
				<input type="radio">
			</div>
		);
	}
}
