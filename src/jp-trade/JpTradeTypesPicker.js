import React, { PropTypes, Component } from 'react';
import TabList from '../_common/TabList';
import Tab from '../_common/Tab';

export default class JpTradeTypesPicker extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <TabList>
                <Tab text="Higher/Lower" />
                <Tab text="Touch/No Touch" />
                <Tab text="Ends In/Out" />
                <Tab text="Stays In/Goes Out" />
            </TabList>
        );
    }
}
