import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { M } from 'binary-components';

export default class SideBarBtn extends PureComponent {
    props: {
        to: string,
        img: string,
        text: string,
    };

    render() {
        const { to, img, text } = this.props;

        return (
            <Link to={to} activeClassName="active" className="sidebar-btn">
                <img src={img} role="presentation" />
                <M m={text} />
            </Link>
        );
    }
}
