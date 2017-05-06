import React, { PureComponent } from 'react';

export default class AssetPickerHeader extends PureComponent {

	props: {
		market: string,
		submarket: string,
	};

	render() {
		const { market, submarket } = this.props;

		return (
			<thead>
				<tr>
					<th colSpan="100">{market} \ {submarket}</th>
				</tr>
			</thead>
		);
	}
}
