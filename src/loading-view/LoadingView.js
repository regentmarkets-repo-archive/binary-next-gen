import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import M from 'binary-components/lib/M';

export default class LoadingView extends Component {

    static propTypes = {
        showMessage: PropTypes.bool,
        text: PropTypes.string,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

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
