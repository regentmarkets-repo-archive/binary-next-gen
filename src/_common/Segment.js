import React, { PropTypes, Component } from 'react';
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
    href: PropTypes.string,
    text: PropTypes.string,
    active: PropTypes.bool,
    onSelect: PropTypes.func,
};

export default Segment;
