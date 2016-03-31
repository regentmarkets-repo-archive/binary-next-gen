import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import Button from '../_common/Button';
import NumberPlain from '../_common/NumberPlain';

export default class VirtualTopUpConfirmation extends Component {

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
                    <Button text="OK" onClick={onClose} />
                </div>
            </div>
        );
    }
}
