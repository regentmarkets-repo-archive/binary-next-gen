import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Direction, NumberColored } from '../_common';
import WatchlistSparkline from './WatchlistSparkline';

const historyDiff = (history) => {
	if (!history || history.length <= 1) return 0;

	return history[history.length - 1].quote - history[history.length - 2].quote;
};

export default class WatchlistRow extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		asset: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		history: PropTypes.object,
	};

	render() {
		const { asset } = this.props;
		if (!asset) return <tr/>;

		const history = this.props.history ? this.props.history.toJS() : [];
		const diff = historyDiff(history);
		const { quote } = history[history.length - 1] || {};

		return (
			<tr>
				<td><Direction diff={diff} /></td>
				<td>{asset.display_name}</td>
				<td>{quote}</td>
				<td><NumberColored value={diff.toPrecision(2)} /></td>
				<td><WatchlistSparkline history={history} /></td>
			</tr>
		);
	}
}
