import React, { Component } from 'react';
import { TradeChart } from 'binary-charts';

const testTitle = 'Test';
const testData = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]];


export default class ChartTest extends Component {

	render() {
		return (
			<TradeChart
				className="test-chart"
				title={testTitle}
				data={testData}
			/>
		);
	}
}
