import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.any,
    };

    render() {
        const rootPath = window.location.origin.includes('github') ? 'binary-next-gen/' : '/';

        return (
            <div id="content">
                <h1><Link to={rootPath}>Binary App</Link></h1>
                {this.props.children}
            </div>
        );
    }
}
