import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import setCurrencySelectors from './setCurrencySelectors';
import SetCurrencyCard from './SetCurrencyCard';

@connect(setCurrencySelectors)
export default class SetCurrencyContainer extends PureComponent {

  render() {
    return (
      <SetCurrencyCard {...immutableChildrenToJS(this.props)} />
    );
  }

}
