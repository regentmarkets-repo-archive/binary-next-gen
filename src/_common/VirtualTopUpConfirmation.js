import React, { PropTypes, Component } from 'react';
import M from './M';
import NumberPlain from './NumberPlain';

export default class TopUpConfirmation extends Component {

    static propTypes = {
        response: PropTypes.object.isRequired,
        onClose: PropTypes.func,
    };

    render() {
        const { response, onClose } = this.props;
        return (
            <div>
                {response.error ?
                    <M m={response.error} /> :
                    <div>
                        <NumberPlain currency={response.topup_virtual.currency} value={response.topup_virtual.amount} />
                        &nbsp;has been credited to your Virtual money account
                    </div>
                }
                <div className="centerer">
                    <button onClick={onClose}><M m="OK" /></button>
                </div>
            </div>
        );
    }
}
