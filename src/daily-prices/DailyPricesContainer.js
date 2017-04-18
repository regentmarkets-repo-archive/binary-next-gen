import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';

import DailyPricesCard from './DailyPricesCard';
import dailyPricesSelectors from './dailyPricesSelectors';

@connect(dailyPricesSelectors)
export default class DailyPricesContainer extends PureComponent {
    render() {
        return <DailyPricesCard {...immutableChildrenToJS(this.props)} />;
    }
}
