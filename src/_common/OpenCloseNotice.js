import React, { Component, PropTypes } from 'react';
import M from '../_common/M';

export default class OpenCloseNotice extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
    }

    static defaultProps = {
        isOpen: false,
    }

    render() {
        const { isOpen } = this.props;

        return isOpen ?
            <M m="Open" className="open-notice" /> :
            <M m="Closed" className="closed-notice" />;
    }
}
