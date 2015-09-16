import React from 'react';
import { Link } from 'react-router';

const Segment = (props) => {
    const { href, text, active, onSelect } = props;

    return (
        <li className={active && 'active'}>
            <Link to={href} onClick={onSelect} activeClassName="active">{text}</Link>
        </li>
    );
};

Segment.propTypes = {
    href: React.PropTypes.string,
    text: React.PropTypes.string,
    active: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
};


export default Segment;
