import React, { Component, PropTypes } from 'react';
import Tabs from '../_common/Tabs';
import FullTradeDuration from './FullTradeDuration';
import FullTradeBarriers from './FullTradeBarriers';

export default class FullTradeTypeSelector extends Component {
    static propTypes = {
        selectedType: PropTypes.string.isRequired,
        contractOptions: PropTypes.array.isRequired,      // ele should have name, barriersInfo, durationInfo
        onTypeChange: PropTypes.func,
        onDurationChange: PropTypes.func,
        onDurationUnitChange: PropTypes.func,
        onBarrier1Change: PropTypes.func,
        onBarrier2Change: PropTypes.func,
    };

    onTabChange(idx) {
        const { contractOptions, onTypeChange } = this.props;
        const typeSelected = contractOptions[idx].value;
        onTypeChange(typeSelected);
    }

    render() {
        const { contractOptions, onDurationChange, onDurationUnitChange, onBarrier1Change, onBarrier2Change } = this.props;
        const tabs = contractOptions.map(opt => ({
            text: opt.name,
            component: (
                <div>
                    <FullTradeDuration
                        onValueChange={onDurationChange}
                        onUnitChange={onDurationUnitChange}
                        {...opt.durationInfo}
                    />
                    <FullTradeBarriers
                        barriersInfo={opt.barriersInfo}
                        onBarrier1Change={onBarrier1Change}
                        onBarrier2Change={onBarrier2Change}
                    />
                </div>
            ) })
        );
        return (
            <div>
                <Tabs id="trade-selection" tabs={tabs} onChange={::this.onTabChange} />
            </div>
        );
    }
}
