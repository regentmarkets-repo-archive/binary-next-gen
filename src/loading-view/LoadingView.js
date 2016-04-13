import React, { Component, PropTypes } from 'react';
import M from '../_common/M';

export default class LoadingView extends Component {
    static propTypes = {
        showMessage: PropTypes.bool,
        text: PropTypes.string,
    };

    render() {
        const { showMessage } = this.props;
        return (
            <div className="mobile-page">
                <img className="spinner" src="img/binary-symbol-logo.svg" alt="Loading" />
                {showMessage &&
                    <p>
                        <M m="Taking too long to load, check connection." />
                    </p>}
            </div>
        );
    }
}
