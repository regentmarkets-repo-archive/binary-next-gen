import React, { PropTypes, Component } from 'react';
import BarrierInput from './BarrierInput';

export default class FullTradeBarriers extends Component {
    /***
     * should show barriers with default values
     * there could be 0, 1, or 2 barriers
     */
    static propTypes = {
        barriersInfo: PropTypes.array.isRequired,  // shape = { name, min, max, onBarrierChange }, assuming always numeric
    };

    render() {
        const { barriersInfo } = this.props;
        return (
            <div>
                {barriersInfo.map(b => {
                    return <BarrierInput min={b.min} max={b.max} name={b.name} onBarrierChange={b.onBarrierChange} />;
                })}
            </div>
        );
    }
}
