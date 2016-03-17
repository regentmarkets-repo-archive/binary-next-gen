import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import tradeButtonSelector from './NewTradeButtonSelector';
import NewTradeButton from './NewTradeButton';

@connect(tradeButtonSelector)
export default class NewTradeButtonContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <NewTradeButton {...this.props} />
        );
    }
}
