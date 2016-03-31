import React, { Component, PropTypes } from 'react';
import CloseButton from '../_common/CloseButton';

export default class TradeHeaders extends Component {

    static propTypes = {
        assetName: PropTypes.string.isRequired,
        onClosePanel: PropTypes.func.isRequired,
    };

    render() {
        const { assetName, onClosePanel } = this.props;

        return (
            <div className="trade-header inverse">
                <span>{assetName}</span>
                <CloseButton onClick={onClosePanel} />
            </div>
        );
    }
}
