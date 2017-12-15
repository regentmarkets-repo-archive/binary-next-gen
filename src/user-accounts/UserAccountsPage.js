import React from 'react';
import WebPage from '../containers/WebPage';
import UserAccountsContainer from './UserAccountsContainer';

export default (props) => (
  <WebPage>
    <UserAccountsContainer {...props} />
  </WebPage>
);
