import React, { PropTypes, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import InputGroup from 'binary-components/lib/InputGroup';
import { actions } from '../_store';
import MarketSubmarketPickerContainer from './MarketSubmarketPickerContainer';

export default class AssetPickerFilter extends PureComponent {

	static propTypes = {
		compact: PropTypes.bool,
		filter: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const { compact } = this.props;
		const assetSearchNode = findDOMNode(this.refs.assetSearch);
		if (!compact) {
			setTimeout(() => assetSearchNode.firstChild.focus(), 300);
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
					ref="assetSearch"
					className="asset-search"
					defaultValue={filter.query}
					type="search"
					placeholder="Search for assets"
					onChange={this.onSearchQueryChange}
				/>
				<MarketSubmarketPickerContainer
					onChange={this.onFilterChange}
					allOptionShown
					value={filter.filter}
				/>
			</div>
		);
	}
}
