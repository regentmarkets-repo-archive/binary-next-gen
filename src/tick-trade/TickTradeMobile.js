import React from 'react';
import MobilePage from '../containers/MobilePage';
import TickTradeContainer from './TickTradeContainer';
// import FullTradeContainer from '../fulltrade/FullTradeContainer';
// import TabList from '../_common/TabList';
// import Tab from '../_common/Tab';

export default (props) => (
	<MobilePage>
		{/* <TabList
			//activeIndex={activeTradeIndex}
			//onChange={index => () => actions.changeActiveTrade(index)}
		>
			<Tab text="Tick Trading" />
			<Tab text="Full Trading" />
			<Tab text="JP Trading" />
		</TabList>*/}
		<TickTradeContainer compact {...props} />
	</MobilePage>
);
