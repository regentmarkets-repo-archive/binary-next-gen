import React from 'react';
import VideoThumbnail from './VideoThumbnail.js';

const VideoList = ({videos, elementOnClick}) => (
    <ul>
        {videos.map((v, i) =>
            <VideoThumbnail
                key={i}
                title={v.title}
                imgSrc={v.imgSrc}
                videoUrl={v.videoUrl}
                onClick={elementOnClick} />
        )}
    </ul>
);

export default VideoList;
