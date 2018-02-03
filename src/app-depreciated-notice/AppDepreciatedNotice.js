import React, { PureComponent } from 'react';
import { P } from 'binary-components';


export default class AppDepreciatedNotice extends PureComponent {
    render() {
        return (
          <P className="notice-msg" text="In order to focus our development efforts on other products, we’re ending support for the Next-Gen application which will be discontinued in the near future. Please consider other trading platforms such as Binary Bot and Webtrader." />
        );
    }
}
