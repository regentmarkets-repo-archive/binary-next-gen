import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import userAccountsSelectors from './userAccountsSelectors';
import UserAccountsCard from './UserAccountsCard';

@connect(userAccountsSelectors)
export default class UserAccountsContainer extends PureComponent {
  render() {
    return (
      <UserAccountsCard {...immutableChildrenToJS(this.props)} />
    );
  }

}
