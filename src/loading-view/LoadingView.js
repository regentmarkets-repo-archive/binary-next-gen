import React, { PureComponent, PropTypes } from 'react';
import M from 'binary-components/lib/M';

export default class LoadingView extends PureComponent {

    static propTypes = {
        showMessage: PropTypes.bool,
        text: PropTypes.string,
    };

    render() {
        const { showMessage } = this.props;
        return (
            <div className="loading-page">
                <div className="logo-full">
                    <img src="img/binary-symbol-logo.svg" alt="Logo" /><img src="img/binary-type-logo.svg" alt="Binary.com" />
                </div>
                <div className="barspinner">
                    <div className="rect1" />
                    <div className="rect2" />
                    <div className="rect3" />
                    <div className="rect4" />
                    <div className="rect5" />
                </div>
                {showMessage &&
                    <p>
                        <M m="Taking too long to load, check connection." />
                    </p>}
            </div>
        );
    }
}
