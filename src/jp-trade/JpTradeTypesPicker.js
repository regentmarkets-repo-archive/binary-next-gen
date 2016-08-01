import React, { PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';

export default class JpTradeTypesPicker extends PureComponent {

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
