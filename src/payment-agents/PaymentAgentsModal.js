import React from 'react';
import { Modal } from '../_common';
import PaymentAgentsContainer from './PaymentAgentsContainer';

export default (props) => (
    <Modal shown>
        <PaymentAgentsContainer {...props} />
    </Modal>
);
