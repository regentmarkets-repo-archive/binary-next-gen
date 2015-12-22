import React from 'react';
import Echart from './EChart';
import chartOptsK from './options/ChartOptionsK';
import SizeProvider from '../_common/SizeProvider';

export default class ChartTest extends React.Component {
	render() {
		return (
			<SizeProvider style={{ height: '100%', width: '100%' }}>
				<Echart options={chartOptsK} style={{ height: '500px', width: '800px' }}/>
			</SizeProvider>
		);
	}
}
