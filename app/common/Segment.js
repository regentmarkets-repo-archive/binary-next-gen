import React from 'react';

export default class Segment {

    static propTypes = {
        name: React.PropTypes.string,
        active: React.PropTypes.bool,
        onSelect: React.PropTypes.func
    };

    render() {

        const { name, active, onSelect } = this.props;

        return (
            <li className={active ? "active" : ""}>
                <a href="#" onClick={onSelect}>{name}</a>
            </li>
        );
    }
}
