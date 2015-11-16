import React from 'react';
import VideoThumbnail from './VideoThumbnail.js';

const VideoList = ({video, onSelect}) => (
    <ul>
        {video.get('list').map((v, i) =>
            <VideoThumbnail
                key={'video' + i}
                title={v.title}
                imgSrc={v.imgSrc}
                videoId={v.videoId}
                onClick={onSelect} />
        )}
    </ul>
);

export default VideoList;
