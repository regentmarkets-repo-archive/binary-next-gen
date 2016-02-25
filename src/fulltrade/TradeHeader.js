import React, { Component, PropTypes } from 'react';
import M from '../_common/M';

export default class GenericTradeCard extends Component {

    static propTypes = {
        assetName: PropTypes.string.isRequired,
        onClosePanel: PropTypes.func.isRequired,
    };

    render() {
        const { assetName, onClosePanel } = this.props;

        return (
            <div className="trade-header inverse">
                {assetName}
                <button className="btn-secondary" onClick={onClosePanel}>
                    <M m="X" />
                </button>
            </div>
        );
    }
}
