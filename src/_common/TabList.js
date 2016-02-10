import React, { PropTypes } from 'react';

export default class TabList extends React.Component {

    static propTypes = {
        children: PropTypes.array.isRequired,
        activeIndex: PropTypes.number.isRequired,
        isVertical: PropTypes.bool.isRequired,
        showText: PropTypes.bool.isRequired,
        showIcons: PropTypes.bool.isRequired,
        style: PropTypes.object,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        activeIndex: 0,
        isVertical: false,
        showText: true,
        showIcons: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex,
        };
    }

    tabSelected(index) {
        const { onChange } = this.props;
        onChange(index);
        this.setState({ activeIndex: index });
    }

    render() {
        const { isVertical, showIcons, showText } = this.props;
        const { activeIndex } = this.state;

        return (
            <div role="tablist" className={isVertical ? 'vertical' : ''}>
                {React.Children.map(this.props.children, (child, idx) =>
                    React.cloneElement(child, {
                        selected: activeIndex === idx,
                        showIcon: showIcons,
                        showText,
                        onMouseDown: () => this.tabSelected(idx),
                    })
                )}
            </div>
        );
    }
}
