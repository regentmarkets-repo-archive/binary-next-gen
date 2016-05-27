import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import classnames from 'classnames';

export default class WarningMsg extends Component {
    static propTypes = {
        className: PropTypes.string,
        shown: PropTypes.bool,
        text: PropTypes.string.isRequired,
    };
    render() {
        const { shown, text, className } = this.props;
        return shown ? <p className={classnames('notice-msg', className)}><M m={text} /></p> : null;
    }
}

