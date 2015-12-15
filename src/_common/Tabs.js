import React, { PropTypes } from 'react';
import { RadioItem } from '../_common';

export default class Tabs extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        tabs: PropTypes.array.isRequired,
        activeIndex: PropTypes.number.isRequired,
        onChange: PropTypes.func,
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
                            onChange={() => onChange(idx)}
                        />
                    )}
                </div>
                {ActiveComponent}
            </div>
        );
    }
}
