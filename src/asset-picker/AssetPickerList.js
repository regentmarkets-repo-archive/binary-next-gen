import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import SelectGroup from '../_common/SelectGroup';
import groupByKey from 'binary-utils/lib/groupByKey';

export default class AssetPickerList extends Component {

	static propTypes = {
		assets: PropTypes.array.isRequired,
		compact: PropTypes.bool,
		grouped: PropTypes.bool,
		selectedAsset: PropTypes.string,
		onSelect: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const focusedNode = findDOMNode(this.refs.focused);
		if (focusedNode) focusedNode.focus();
    }

	render() {
		const { assets, onSelect, selectedAsset } = this.props;
		const simplifiedAssets = assets.map(a => ({ text: a.name, value: a.symbol, market: a.market }));
		const groupedAssets = groupByKey(simplifiedAssets, 'market');

		return (
			<SelectGroup
				optgroups={groupedAssets}
				value={selectedAsset}
				onChange={e => onSelect(e.target.value)}
			/>
		);
	}
}
