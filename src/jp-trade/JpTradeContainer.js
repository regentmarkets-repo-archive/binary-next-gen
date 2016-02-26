import React, { PropTypes, Component } from 'react';
import JpTradeCard from './JpTradeCard';

export default class JpTradeContainer extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <JpTradeCard />
        );
    }
}
