import React, { PropTypes, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { InputGroup } from 'binary-components';
import { isMobile } from 'binary-utils';
import { actions } from '../_store';
import MarketSubmarketPickerContainer from './MarketSubmarketPickerContainer';
import AssetPickerCategoryFilter from './AssetPickerCategoryFilter';

export default class AssetPickerFilter extends PureComponent {

	static propTypes = {
		filter: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const assetSearchNode = findDOMNode(this);
		if (!isMobile()) {
			setTimeout(() =>
				assetSearchNode.firstChild &&
				assetSearchNode.firstChild.firstChild &&
				assetSearchNode.firstChild.firstChild.focus(),
			100);
		}
	}

	onSearchQueryChange = e => {
		actions.updateAssetPickerSearchQuery(e.target.value);
	}

	onFilterChange = e => {
		actions.updateAssetPickerFilter(e);
	}

	render() {
		const { filter } = this.props;

		return (
			<div className="asset-picker-filter">
				<InputGroup
					className="asset-search"
					defaultValue={filter.query}
					type="search"
					placeholder="Search for assets"
					onChange={this.onSearchQueryChange}
				/>
				{/* <AssetPickerCategoryFilter
					onChange={this.onFilterChange}
					value={filter.filter}
				/> */}
				<MarketSubmarketPickerContainer
					onChange={this.onFilterChange}
					allOptionShown
					value={filter.filter}
				/>
			</div>
		);
	}
}
