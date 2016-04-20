import React, { PropTypes, Component } from 'react';

export default class FlexList extends Component {
    static propTypes = {
        children: PropTypes.object,
        orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    };

    render() {
        const { children } = this.props;
        return (
            <div className="labeled-list">
                {
                    React.Children.map(children, ch => <span className="list-item">{ch}</span>)
                }
            </div>
        );
    }
}
