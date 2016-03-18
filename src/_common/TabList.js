import React, { PropTypes, Component } from 'react';

export default class TabList extends Component {

    static propTypes = {
        id: PropTypes.string,
        children: PropTypes.array.isRequired,
        activeIndex: PropTypes.number.isRequired,
        vertical: PropTypes.bool.isRequired,
        showText: PropTypes.bool.isRequired,
        showIcons: PropTypes.bool.isRequired,
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
        const { id, vertical, showIcons, showText } = this.props;
        const { activeIndex } = this.state;

        return (
            <div
                id={id}
                role="tablist"
                className={vertical ? 'vertical' : ''}
            >
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
