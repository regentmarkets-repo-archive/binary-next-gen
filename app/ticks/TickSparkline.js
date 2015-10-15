import React from 'react';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const TickSparkline = (props) => (
	<Sparklines {...props} data={props.history.map((h) => h.quote)} limit={30} >
		<SparklinesLine />
		<SparklinesSpots />
	</Sparklines>
);

TickSparkline.propTypes = {
	history: React.PropTypes.array,
};

TickSparkline.defaultProps = {
	history: [],
};

export default TickSparkline;
