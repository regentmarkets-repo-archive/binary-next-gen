import React, { PureComponent } from 'react';
import { M } from 'binary-components';
import { connect } from 'react-redux';

@connect(state => ({ language: state.boot.get('language') }))
export default class AppDepreciatedNotice extends PureComponent {
    props: {
        language: string,
    };

    render() {
        const language = (this.props.language || 'en').toLowerCase();
        const linkToPlatforms = `https://www.binary.com/${language}/platforms.html`;

        return (
          <div className="notice-msg app-depreciated-notice">
              <M m="In order to focus our development efforts on other products, we’re ending support for the Next-Gen application which will be discontinued in the near future. Please consider other " />&nbsp;
              <a href={linkToPlatforms} target="_blank" rel="noopener noreferrer">
                  <M m="trading platforms " />
              </a>
              <M m="such as Binary Bot, Webtrader and Tick Trade app." />
          </div>
        );
    }
}
