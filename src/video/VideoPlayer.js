import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

@connect(state => ({urls: state.urls, idx: state.currentIndex}))
export default class VideoPlayer extends React.Component {

    render() {
        const {urls, idx} = this.props;
        return (<YouTube
            url={'https://www.youtube.com/watch?v=zQJy9sFHU38'}
            />)
    }
}

