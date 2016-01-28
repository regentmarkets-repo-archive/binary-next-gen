import React, { PropTypes } from 'react';
import { MarketPicker } from '../_common';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		headers: PropTypes.array.isRequired,
		durations: PropTypes.array.isRequired,
		submarket: PropTypes.string.isRequired,
	};

	render() {
		const { actions, durations, headers, submarket } = this.props;

		return (
			<div>
				<MarketPicker
					onChange={x => actions.updateAssetIndexSubmarket(x)}
					allOptionShown={false}
					value={submarket}
				/>
				<AssetIndexTable
					headers={headers}
					durations={durations}
				/>
			</div>
		);
	}
}
