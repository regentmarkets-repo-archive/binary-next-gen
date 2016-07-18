import React, { PureComponent, PropTypes } from 'react';
import M from 'binary-components/lib/M';

export default class InitAppLoadingView extends PureComponent {

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
