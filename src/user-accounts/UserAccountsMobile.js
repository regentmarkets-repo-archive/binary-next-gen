import React from 'react';
import MobilePage from '../containers/MobilePage';
import UserAccountsContainer from './UserAccountsContainer';

export default (props) => (
    <MobilePage>
        <UserAccountsContainer {...props} />
    </MobilePage>
);
