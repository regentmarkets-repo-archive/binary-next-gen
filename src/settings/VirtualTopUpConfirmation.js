import React, { PureComponent } from 'react';
import { M, Button, NumberPlain } from 'binary-components';

export default class VirtualTopUpConfirmation extends PureComponent {
    props: {
        response: object,
        onClose: (e: SyntheticEvent) => void,
    };

    render() {
        const { response, onClose } = this.props;
        return (
            <div>
                {response.error
                    ? <M m={response.error} />
                    : <div>
                          <NumberPlain
                              currency={response.topup_virtual.currency}
                              value={response.topup_virtual.amount}
                          />
                          &nbsp;has been credited to your Virtual money account
                      </div>}
                <div className="centerer">
                    <Button text="OK" onClick={onClose} />
                </div>
            </div>
        );
    }
}
