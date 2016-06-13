import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import NewsCardMobile from './NewsCardMobile';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class NewsContainerMobile extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <NewsCardMobile {...immutableChildrenToJS(this.props)} />
        );
    }
}
