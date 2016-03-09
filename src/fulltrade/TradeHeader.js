import React, { Component, PropTypes } from 'react';

export default class TradeHeaders extends Component {

    static propTypes = {
        assetName: PropTypes.string.isRequired,
        onClosePanel: PropTypes.func.isRequired,
    };

    render() {
        const { assetName, onClosePanel } = this.props;

        return (
            <div className="trade-header inverse">
                {assetName}
                <a onClick={onClosePanel}>
                    <svg width="18" height="18" viewBox="0 0 18 18" class="close-svg">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47
                                    1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                        />
                    </svg>
                </a>
            </div>
        );
    }
}
