import React, { Component, PropTypes } from 'react';
import CloseButton from '../_common/CloseButton';

export default class TradeHeaders extends Component {

    static propTypes = {
        assetName: PropTypes.string.isRequired,
        closable: PropTypes.bool,
        onClosePanel: PropTypes.func.isRequired,
    };
    static defaultProps = {
        closable: true,
    };
    render() {
        const { assetName, onClosePanel, closable } = this.props;

        return (
            <div className="trade-header inverse">
                <span>{assetName}</span>
                {closable && <CloseButton onClick={onClosePanel} />}
            </div>
        );
    }
}
