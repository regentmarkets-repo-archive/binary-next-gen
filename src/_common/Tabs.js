import React, { PropTypes } from 'react';
import RadioItem from './RadioItem';

export default class Tabs extends React.Component {

    static propTypes = {
        activeIndex: PropTypes.number.isRequired,
        className: PropTypes.string,
        id: PropTypes.string.isRequired,
        style: PropTypes.object,
        tabs: PropTypes.array.isRequired,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        activeIndex: 0,
        tabs: [],
    };

    render() {
        const { activeIndex, className, id, style, tabs, onChange } = this.props;
        const ActiveComponent = tabs.filter((tab, idx) => activeIndex === idx).map(x => x.component)[0];
        return (
            <div className={className} style={style}>
                <div role="tabs">
                    {tabs.map((tab, idx) =>
                        <RadioItem
                            key={id + idx}
                            defaultChecked={activeIndex === idx}
                            label={tab.text}
                            name={id}
                            img={tab.img}
                            value={id + idx}
                            onChange={() => onChange(idx)}
                        />
                    )}
                </div>
                <div className="tab-content">
                    {ActiveComponent}
                </div>
            </div>
        );
    }
}
