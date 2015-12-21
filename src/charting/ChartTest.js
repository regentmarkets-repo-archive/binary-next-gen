import React from 'react';
import Echart from './EChart';
import chartOptsK from './options/ChartOptionsK';
import SizeProvider from '../_common/SizeProvider';

export default class ChartTest extends React.Component {
	halfSize(w, h) {
		return { height: h / 2, width: w / 2 };
	}

	render() {
		return (
			<SizeProvider windowSizeRelation={::this.halfSize}>
				<Echart options={chartOptsK} style={{ width: '800px', height: '600px' }} />
			</SizeProvider>
		);
	}
}
