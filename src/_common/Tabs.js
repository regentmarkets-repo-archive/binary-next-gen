import React from 'react';
import { RadioItem } from '../_common';

export default class Tabs extends React.Component {

    static propTypes = {
        id: React.PropTypes.string.isRequired,
        tabs: React.PropTypes.array.isRequired,
        activeIndex: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func,
    };

    static defaultProps = {
        activeIndex: 0,
    };

    render() {
        const { id, tabs, activeIndex, onChange } = this.props;
        const ActiveComponent = tabs.filter((tab, idx) => activeIndex === idx).map(x => x.component)[0];
        return (
            <div>
                <div role="tabs">
                    {tabs.map((tab, idx) =>
                        <RadioItem
                            key={id + idx}
                            defaultChecked={activeIndex === idx}
                            label={tab.text}
                            name={id}
                            value={id + idx}
                            onChange={() => onChange(idx)} />
                    )}
                </div>
                {ActiveComponent}
            </div>
        );
    }
}
