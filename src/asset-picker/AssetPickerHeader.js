import React, { PropTypes } from 'react';

export default class AssetPickerHeader extends React.Component {

	static propTypes = {
		market: PropTypes.string.isRequired,
		submarket: PropTypes.string.isRequired,
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
