import React, { PropTypes, Component } from 'react';
import MarketPickerContainer from '../_common/MarketPickerContainer';
import InputGroup from '../_common/InputGroup';

export default class AssetPickerFilter extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		filter: PropTypes.object.isRequired,
	};

	render() {
		const { actions, filter } = this.props;

		const valueSelector = v => v !== 'All' ? v : ''; 
		const onSearchQueryChange = e => actions.updateAssetPickerSearchQuery(valueSelector(e.target.value));
		const onSubmarketChange = e => actions.updateAssetPickerSubmarket(valueSelector(e));

		const showOnlyTickTradable = false;

		return (
			<fieldset>
				<MarketPickerContainer
					onChange={onSubmarketChange}
					allOptionShown
					showMarkets={showOnlyTickTradable ? ['Forex', 'Randoms'] : null}
					value={filter.submarket}
				/>
				<InputGroup
					className="asset-search"
					defaultValue={filter.query}
					type="search"
					placeholder="Search for assets"
					onChange={onSearchQueryChange}
					autoFocus
				/>
			</fieldset>
		);
	}
}
