import React, { PureComponent, PropTypes } from 'react';
import Option from 'binary-components/lib/Option';

export default class DigitStatsFilter extends PureComponent {

    static propTypes = {
        value: PropTypes.number,
        onChange: PropTypes.func,
    };

    render() {
        const { onChange, value } = this.props;

        return (
            <div className="digit-stats-filter">
                <select value={value} onChange={onChange}>
                    <Option text="Last 25 Ticks" value="25" />
                    <Option text="Last 50 Ticks" value="50" />
                    <Option text="Last 100 Ticks" value="100" />
                    <Option text="Last 500 Ticks" value="500" />
                    <Option text="Last 1000 Ticks" value="1000" />
                </select>
            </div>
        );
    }
}
