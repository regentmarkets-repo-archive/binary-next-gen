import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class FlexList extends Component {
    static defaultProps = {
        orientation: 'horizontal',
    };

    static propTypes = {
        children: PropTypes.any,
        orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    };

    render() {
        const { children, orientation } = this.props;
        const className = classNames('flex-list', orientation);
        return (
            <div className={className}>
                {
                    React.Children.map(children, ch => <span className="flex-list-item">{ch}</span>)
                }
            </div>
        );
    }
}
