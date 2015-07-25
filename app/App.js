import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <div id="content">
                <h1><a href="/">Binary App</a></h1>
                {this.props.children}
            </div>
        );
    }
}
