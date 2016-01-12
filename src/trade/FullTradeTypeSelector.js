import React, { Component, PropTypes } from 'react';
import Tabs from '../_common/Tabs';
import FullTradeDuration from './FullTradeDuration';
import FullTradeBarriers from './FullTradeBarriers';

export default class FullTradeTypeSelector extends Component {
    static propTypes = {
        contractOptions: PropTypes.array.isRequired,      // ele should have name, barriersInfo, durationInfo
    };

    render() {
        const { contractOptions } = this.props;
        const tabs = contractOptions.map(opt => ({
            text: opt.name,
            component: (
                <div>
                    <FullTradeDuration {...opt.durationInfo} />
                    <FullTradeBarriers barriersInfo={opt.barriersInfo} />
                </div>
            ) })
        );
        return (
            <div>
                <Tabs id="trade-selection" tabs={tabs} />
            </div>
        );
    }
}
