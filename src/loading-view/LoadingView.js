import React, { Component, PropTypes } from 'react';

export default class LoadingView extends Component {
    static propTypes = {
        text: PropTypes.string,
    };

    render() {
        const { text } = this.props;
        return (
            <div className="mobile-page">
                <img className="spinner" src="img/binary-symbol-logo.svg" />
                {text && <p>{text}</p>}
            </div>
        );
    }
}
