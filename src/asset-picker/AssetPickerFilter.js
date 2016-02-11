import React, { PropTypes } from 'react';
import MarketPickerContainer from '../_common/MarketPickerContainer';
import InputGroup from '../_common/InputGroup';

export default class AssetPickerFilter extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		const { actions } = this.props;

		const onSearchQueryChange = e => actions.updateAssetPickerSearchQuery(e.target.value);
		const onSubmarketChange = e => actions.updateAssetPickerSubmarket(e);

		const showOnlyTickTradable = false;

		return (
			<fieldset>
				<MarketPickerContainer
					onChange={onSubmarketChange}
					allOptionShown
					showMarkets={showOnlyTickTradable ? ['Forex', 'Randoms'] : null}
				/>
				<InputGroup
					className="asset-search"
					type="search"
					placeholder="Search for assets"
					onChange={onSearchQueryChange}
					autoFocus
				/>
			</fieldset>
		);
	}
}
