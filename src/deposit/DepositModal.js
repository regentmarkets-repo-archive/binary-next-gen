import React from 'react';
import Modal from '../containers/Modal';
import DepositContainer from './DepositContainer';

export default (props) => (
    <Modal shown>
        <DepositContainer {...props} />
    </Modal>
);
