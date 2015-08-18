import React from 'react';
import { connect } from 'react-redux';
import SegmentedControl from '../common/SegmentedControl';
import AssetIndexTable from './AssetIndexTable';

@connect(state => ({ offerings: state.serverData.offerings }))
export default class AsssetIndexPage extends React.Component {

	static propTypes = {
		offerings: React.PropTypes.array.isRequired,
	};

	static defaultProps = {
		offerings: [],
	};

	constructor(props) {
		super(props);

		window.console.log(props);
		this.state = {
			offerings: [],
			marketSelected: {},
		};
	}

	onMarketSelect(e) {
		window.console.log(e);
	}

	render() {
		const { offerings } = this.props;
		// const { marketSelected } = this.state;

		const marketLinks = offerings.map(x => ({
			href: x.market.toLowerCase(),
			text: x.market,
		}));

		const marketSelected = offerings[0] || { available: [] };

		window.console.log(offerings);

		return (
			<div>
                <SegmentedControl
					segments={marketLinks}
					onSelect={::this.onMarketSelect} />
				{ marketSelected.available.map(x => <AssetIndexTable submarket={x.submarket} assets={x.available} />) }
			</div>
		);
	}
}
