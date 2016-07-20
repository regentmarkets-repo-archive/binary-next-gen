import React, { PropTypes, Component } from 'react';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const max = data => Math.max.apply(Math, data);
const min = data => Math.min.apply(Math, data);
const ypos = (data, val) => ((val - min(data)) / (max(data) - min(data)) * 120);
const history = data => data.map(x => x.quote);

const TickTradeSparkline = (props) => {
	const height = props.height;
	const width = props.width;
	const h = history(props.history);
	const y = (height - ypos(h, h[h.length - 1])) || height;

	return (
		<div className="tick-sparklines">
			<Sparklines
				width={width}
				height={height}
				data={h}
				limit={20}
				{...props}
			>
				<SparklinesLine />
				<SparklinesSpots />
				<line
					x1={0} y1={y} x2={width} y2={y}
					style={{ stroke: 'green', strokeOpacity: 0.75, strokeDasharray: 'none' }}
				/>
				<rect
					x={0} y={(props.showBarrier ? y - height : y)}
					style={{ fill: 'green', fillOpacity: 0.1 }}
				/>
			</Sparklines>
		</div>
	);
};

TickTradeSparkline.propTypes = {
	history: PropTypes.array,
	showBarrier: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number,
};

TickTradeSparkline.defaultProps = {
	history: [],
	width: 344,
	height: 100,
};

export default TickTradeSparkline;
