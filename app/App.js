import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.any,
    };

    render() {
        return (
            <div id="content">
                <h1><Link to={'/'}>Binary App</Link></h1>
                {this.props.children}
            </div>
        );
    }
}
