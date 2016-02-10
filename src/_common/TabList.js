import React, { PropTypes } from 'react';

export default class TabList extends React.Component {

    static propTypes = {
        activeIndex: PropTypes.number.isRequired,
        isVertical: PropTypes.bool.isRequired,
        showText: PropTypes.bool.isRequired,
        showIcons: PropTypes.bool.isRequired,
        style: PropTypes.object,
        tabs: PropTypes.array.isRequired,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        activeIndex: 0,
        isVertical: false,
        tabs: [],
        showText: true,
        showIcons: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex,
        };
    }

    tabClicked(index) {
        const { onChange } = this.props;
        onChange(index);
        this.setState({ activeIndex: index });
    }

    render() {
        const { isVertical, tabs, showIcons, showText } = this.props;
        const { activeIndex } = this.state;

        return (
            <div role="tablist" className={isVertical ? 'vertical' : ''}>
                {tabs.map((tab, idx) =>
                    <div role="tab"
                        key={idx}
                        href="#"
                        className={activeIndex === idx ? 'active' : ''}
                        img={tab.img}
                        onMouseDown={() => this.tabClicked(idx)}
                    >
                        {showIcons && tab.img && <img src={tab.img} />}
                        {showText && <span>{tab.text}</span>}
                    </div>
                )}
            </div>
        );
    }
}
