import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

export default class WatchlistSparkline extends Component {

	static propTypes = {
		history: PropTypes.object,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const history = this.props.history.toJS();

		return (
			<Sparklines
				data={history.map(x => x.quote)}
				limit={30}
				width={200}
				height={40}
			>
				<SparklinesLine />
				<SparklinesSpots />
			</Sparklines>
		);
	}
}
