import React, { PropTypes, PureComponent } from 'react';

export default class AssetPickerHeader extends PureComponent {

	static propTypes = {
		market: PropTypes.string,
		submarket: PropTypes.string,
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
