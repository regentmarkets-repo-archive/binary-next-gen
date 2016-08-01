import React, { PropTypes, PureComponent } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

export default class WatchlistSparkline extends PureComponent {

	static propTypes = {
		history: PropTypes.object,
	};

	render() {
		const { history } = this.props;
		const quotes = history.takeLast(40).map(x => x.get('quote')).toJS();

		return (
			<Sparklines
				data={quotes}
				limit={40}
				width={250}
				height={40}
			>
				<SparklinesLine />
				<SparklinesSpots />
			</Sparklines>
		);
	}
}
