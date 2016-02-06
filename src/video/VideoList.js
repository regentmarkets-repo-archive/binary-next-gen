import React from 'react';
import VideoThumbnail from './VideoThumbnail.js';

const VideoList = ({ videos, onSelect }) => (
    <ul className="video-list row">
        {videos.map(video =>
            <VideoThumbnail
                key={video.videoId}
                title={video.title}
                imgSrc={video.imgSrc}
                videoId={video.videoId}
                onClick={onSelect}
            />
        )}
    </ul>
);

export default VideoList;
