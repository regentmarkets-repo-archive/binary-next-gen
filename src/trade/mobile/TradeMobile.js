import React from 'react';
import MobilePage from '../../containers/MobilePage';
import MobileTradeContainer from './MobileTradeContainer';

export default props => (
    <MobilePage>
        <MobileTradeContainer {...props} compact index={0} />
    </MobilePage>
);
