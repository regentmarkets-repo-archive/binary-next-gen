import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class MobileToolbarBtn extends PureComponent {
    props: {
        to: string,
        img: string,
    };

    render() {
        const { to, img } = this.props;

        return (
            <Link to={to} activeClassName="active" className="mobile-nav-btn">
                <img src={img} alt="Menu" />
            </Link>
        );
    }
}
