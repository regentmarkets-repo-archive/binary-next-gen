import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class FlexList extends Component {
    static defaultProps = {
        orientation: 'horizontal',
    };

    static propTypes = {
        id: PropTypes.string,
        children: PropTypes.any,
        className: PropTypes.string,
        orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    };

    render() {
        const { id, className, children, orientation } = this.props;
        const combinedClassName = classNames('flex-list', orientation, className);
        return (
            <div id={id} className={combinedClassName}>
                {React.Children.map(children, child =>
                    <span className="flex-list-item">{child}</span>)
                }
            </div>
        );
    }
}
