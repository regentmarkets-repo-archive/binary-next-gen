import React, { PropTypes, Component } from 'react';
import MarketPickerContainer from '../_common/MarketPickerContainer';
import InputGroup from '../_common/InputGroup';

export default class AssetPickerFilter extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		filter: PropTypes.object.isRequired,
	};

	onSearchQueryChange(e) {
		const { actions } = this.props;
		actions.updateAssetPickerSearchQuery(e.target.value);
	}

	onFilterChange(e) {
		const { actions } = this.props;
		actions.updateAssetPickerFilter(e);
	}

	render() {
		const { filter } = this.props;

		const showOnlyTickTradable = false;

		return (
			<div className="asset-picker-filter">
				<MarketPickerContainer
					onChange={::this.onFilterChange}
					allOptionShown
					showMarkets={showOnlyTickTradable ? ['Forex', 'Randoms'] : null}
					value={filter.filter}
				/>
				<InputGroup
					className="asset-search"
					defaultValue={filter.query}
					type="search"
					placeholder="Search for assets"
					onChange={::this.onSearchQueryChange}
					autoFocus
				/>
			</div>
		);
	}
}
