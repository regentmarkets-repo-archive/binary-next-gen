import React from 'react';
import { Modal } from '../_common';
import DepositContainer from './DepositContainer';

export default (props) => (
    <Modal shown>
        <DepositContainer {...props} />
    </Modal>
);
