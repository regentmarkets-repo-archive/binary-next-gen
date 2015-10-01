import React from 'react';

export default class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.any,
    };

    render() {
        return (
            <div id="content">
                {this.props.children}
            </div>
        );
    }
}
