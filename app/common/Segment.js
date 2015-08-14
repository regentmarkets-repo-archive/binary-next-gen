import React from 'react';
import { Link } from 'react-router';

export default class Segment {

    static propTypes = {
        href: React.PropTypes.string,
        text: React.PropTypes.string,
        active: React.PropTypes.bool,
        onSelect: React.PropTypes.func,
    };

    render() {
        const { href, text, active, onSelect } = this.props;

        return (
            <li className={active && 'active'}>
                <Link to={href} onClick={onSelect} activeClassName="active">{text}</Link>
            </li>
        );
    }
}
