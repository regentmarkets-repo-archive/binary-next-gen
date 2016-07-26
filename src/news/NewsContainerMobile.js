import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import NewsCardMobile from './NewsCardMobile';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class NewsContainerMobile extends PureComponent {

    render() {
        return (
            <NewsCardMobile {...immutableChildrenToJS(this.props)} />
        );
    }
}
