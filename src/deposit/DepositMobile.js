import React from 'react';
import { MobilePage } from '../_common';
import DepositContainer from './DepositContainer';

export default (props) => (
    <MobilePage toolbarShown={false} backBtnBarTitle="Deposit">
        <DepositContainer {...props}/>
    </MobilePage>
);
