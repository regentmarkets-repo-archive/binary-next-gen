import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import MarketSubmarketPickerContainer from '../_common/MarketSubmarketPickerContainer';
import InputGroup from '../_common/InputGroup';

export default class AssetPickerFilter extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		compact: PropTypes.bool,
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

    componentDidMount() {
		const { compact } = this.props;
		const assetSearchNode = findDOMNode(this.refs.assetSearch);
		if (!compact) {
			setTimeout(() => assetSearchNode.firstChild.focus(), 300);
		}
    }

	render() {
		const { filter } = this.props;

		const showOnlyTickTradable = false;

		return (
			<div className="asset-picker-filter">
				<InputGroup
					ref="assetSearch"
					className="asset-search"
					defaultValue={filter.query}
					type="search"
					placeholder="Search for assets"
					onChange={::this.onSearchQueryChange}
					autoFocus
				/>
				<MarketSubmarketPickerContainer
					onChange={::this.onFilterChange}
					allOptionShown
					showMarkets={showOnlyTickTradable ? ['Forex', 'Randoms'] : null}
					value={filter.filter}
				/>
			</div>
		);
	}
}
