import React, { PropTypes, PureComponent } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

export default class WatchlistSparkline extends PureComponent {

	static propTypes = {
		history: PropTypes.object,
	};

	render() {
		const history = this.props.history.toJS();

		return (
			<Sparklines
				data={history.map(x => x.quote)}
				limit={30}
				width={250}
				height={40}
			>
				<SparklinesLine />
				<SparklinesSpots />
			</Sparklines>
		);
	}
}
