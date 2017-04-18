import React, { PureComponent } from 'react';
import { Logo } from 'binary-components';
import WebSidebarContainer from '../sidebar/WebSidebarContainer';
import Balance from '../balance/BalanceContainer';
import LayoutPickerContainer from '../layout-picker/LayoutPickerContainer';

export default class WebHeader extends PureComponent {
    render() {
        return (
            <div className="header inverse">
                <Logo />
                <LayoutPickerContainer />
                <Balance />
                <WebSidebarContainer />
            </div>
        );
    }
}
