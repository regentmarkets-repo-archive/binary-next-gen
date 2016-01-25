import React from 'react';

export default class Collapsible extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        children: React.PropTypes.any,
    };

    render() {
        const { title } = this.props;
        return (
            <details>
                <summary>{title}</summary>
                {this.props.children}
            </details>
        );
    }
}
