import React, { PropTypes } from 'react';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const WatchlistSparkline = (props) => (
	<Sparklines
		data={props.history.map((h) => h.quote)}
		limit={30}
		width={60}
		{...props}
	>
		<SparklinesLine />
		<SparklinesSpots />
	</Sparklines>
);

WatchlistSparkline.propTypes = {
	history: PropTypes.array,
};

WatchlistSparkline.defaultProps = {
	history: [],
};

export default WatchlistSparkline;
