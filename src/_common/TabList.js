import React, { PropTypes, Component } from 'react';

export default class TabList extends Component {

    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
        activeIndex: PropTypes.number,
        vertical: PropTypes.bool,
        showText: PropTypes.bool,
        showIcons: PropTypes.bool,
        style: PropTypes.object,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        activeIndex: 0,
        vertical: false,
        showText: true,
        showIcons: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ activeIndex: nextProps.activeIndex });
    }

    tabSelected(index) {
        const { onChange } = this.props;
        onChange(index);
        this.setState({ activeIndex: index });
    }

    render() {
        const { id, className, vertical, showIcons, showText } = this.props;
        const { activeIndex } = this.state;

        return (
            <div
                id={id}
                role="tablist"
                className={(vertical ? 'vertical ' : '') + className}
            >
                {React.Children.map(this.props.children, (child, idx) =>
                    child && React.cloneElement(child, {
                        selected: activeIndex === idx,
                        showIcon: showIcons,
                        showText,
                        onClick: () => this.tabSelected(idx),
                    })
                )}
            </div>
        );
    }
}
