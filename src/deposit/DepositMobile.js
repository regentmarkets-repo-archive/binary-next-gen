import React from 'react';
import MobilePage from '../mobile/MobilePage';
import DepositContainer from './DepositContainer';

export default (props) => (
    <MobilePage toolbarShown={false} backBtnBarTitle="Deposit">
        <DepositContainer {...props}/>
    </MobilePage>
);
