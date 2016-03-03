import React from 'react';
import MobilePage from '../containers/MobilePage';
import TickTradeContainer from './TickTradeContainer';
import TabList from '../_common/TabList';
import Tab from '../_common/Tab';

export default (props) => (
	<MobilePage>
		<TabList>
			<Tab text="Tick Trading" />
			<Tab text="Full Trading" />
			<Tab text="JP Trading" />
		</TabList>
		<TickTradeContainer compact {...props} />
	</MobilePage>
);
