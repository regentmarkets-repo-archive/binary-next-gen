import React from 'react';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';


const max = data => Math.max.apply(Math, data);
const min = data => Math.min.apply(Math, data);
const ypos = (data, val) => ((val - min(data)) / (max(data) - min(data)) * 120);
const history = data => data.map(x => x.quote);

const TickTradeSparkline = (props) => {
	const h = history(props.history);
	const y = 120 - ypos(h, h[h.length - 1]);
	window.console.log((props.isCall ? y + 120 : y));
	return (
		<Sparklines {...props} data={h} limit={20} >
			<SparklinesLine />
			<SparklinesSpots />
			<line x1={0} y1={y} x2={props.width} y2={y}
				 style={{ stroke: 'green', strokeOpacity: 0.75, strokeDasharray: 'none' }} />
			 <rect x={0} y={(props.isCall ? y - 120 : y)}
				style={{ fill: 'green', fillOpacity: 0.1 }} />
		</Sparklines>
	);
};

TickTradeSparkline.propTypes = {
	history: React.PropTypes.array,
	isCall: React.PropTypes.bool,
};

TickTradeSparkline.defaultProps = {
	history: [],
};

export default TickTradeSparkline;
