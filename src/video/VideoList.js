import React from 'react';
import { connect } from 'react-redux';
import VideoRow from './VideoRow.js'

const VideoList = (videos) => (
    <ul>
        { videos.map((v) =>
            <VideoRow
                title={v.title}
                imgSrc={v.imgSrc}
                url={v.url} /> ) }
    </ul>
);

export default VideoList;