import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Direction from '../_common/Direction';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';
import WatchlistSparkline from './WatchlistSparkline';

export default class WatchlistRow extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assetName: PropTypes.string.isRequired,
		diff: PropTypes.number.isRequired,
		history: PropTypes.array.isRequired,
		quote: PropTypes.number.isRequired,
		selected: PropTypes.bool.isRequired,
		symbol: PropTypes.string.isRequired,
		onSelect: PropTypes.func.isRequired,
	};

	render() {
		const { symbol, assetName, diff, history, quote, onSelect } = this.props;

		return (
			<tr
				onClick={() => onSelect(symbol)}
			>
				<td className="row-id">{assetName}</td>
				<td><NumberPlain value={quote} /></td>
				<td><Direction diff={diff} /> <NumberColored value={diff} /></td>
				<td><WatchlistSparkline history={history} /></td>
			</tr>
		);
	}
}
