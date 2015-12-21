import React from 'react';
import Echart from './EChart';
import chartOptsK from './options/ChartOptionsK';
import SizeProvider from '../_common/SizeProvider';

export default class ChartTest extends React.Component {
	render() {
		return (
			<SizeProvider>
				<Echart options={chartOptsK} style={{ width: '800px', height: '600px' }} />
			</SizeProvider>
		);
	}
}
