import React from 'react';
import { connect } from 'react-redux';
import SegmentedControl from '../common/SegmentedControl';
import AssetIndexTable from './AssetIndexTable';

@connect(state => ({ offerings: state.serverData.offerings }))
export default class AsssetIndexPane extends React.Component {

	static propTypes = {
		params: React.PropTypes.object.isRequired,
		offerings: React.PropTypes.array.isRequired,
	};

	static defaultProps = {
		offerings: [],
	};

	render() {
		const { offerings, params } = this.props;

		const marketLinks = offerings.map(x => ({
			href: '/asset-index/' + x.market.toLowerCase(),
			text: x.market,
		}));

		const marketFromRoute = offerings.find(x => x.market.toLowerCase() === params.market.toLowerCase());
		const marketSelected = marketFromRoute || { available: [] };

		return (
			<div>
                <SegmentedControl segments={marketLinks} />
				{ marketSelected.available.map(x => <AssetIndexTable submarket={x} />) }
			</div>
		);
	}
}
