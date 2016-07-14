import React, { PropTypes, PureComponent } from 'react';
import M from 'binary-components/lib/M';
import Button from 'binary-components/lib/Button';
import NumberPlain from 'binary-components/lib/NumberPlain';

export default class VirtualTopUpConfirmation extends PureComponent {

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
