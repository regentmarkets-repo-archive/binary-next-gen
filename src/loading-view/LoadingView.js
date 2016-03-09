import React, { Component, PropTypes } from 'react';

export default class LoadingView extends Component {
    static propTypes = {
        showMessage: PropTypes.bool,
        text: PropTypes.string,
    };

    render() {
        const { showMessage, text } = this.props;
        return (
            <div className="mobile-page">
                <img className="spinner" src="img/binary-symbol-logo.svg" />
                {showMessage && <p>{text}</p>}
            </div>
        );
    }
}
