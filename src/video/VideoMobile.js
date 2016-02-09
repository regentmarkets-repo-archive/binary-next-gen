import React from 'react';
import MobilePage from '../mobile/MobilePage';
import VideoListContainer from './VideoListContainer';

export default (props) => (
	<MobilePage>
		<VideoListContainer compact {...props} />
	</MobilePage>
);
