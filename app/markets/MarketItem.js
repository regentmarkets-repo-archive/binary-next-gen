import React from 'react';

export default class MarketItem {

	static propTypes = {
		market: React.PropTypes.object.isRequired
	};

	render() {
		const { market } = this.props;

		return (
			<tr>
				<td>
					{market.id}
				</td>
				<td>
					{market.name}
				</td>
			</tr>
		);
	}
}
