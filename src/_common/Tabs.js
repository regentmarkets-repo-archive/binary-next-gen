import React from 'react';
import RadioItem from '../_common';

const Tabs = ({tabs, activeIndex, onSelect}) => (
    <div role="tabs">
        {tabs.map((tab, idx) =>
            <RadioItem
                key={idx}
                defaultChecked={activeIndex === idx}
                img="img/trade-rise.svg"
                label={tab.text}
                name="123"
                value={'dasd' + idx}
                onChange={onSelect} />
        )}
    </div>
);

Tabs.propTypes = {
    tabs: React.PropTypes.array.isRequired,
    activeIndex: React.PropTypes.number.isRequired,
    onSelect: React.PropTypes.func,
};

Tabs.defaultProps = {
    activeIndex: 0,
};

export default Tabs;
