import React from 'react';
import { MobilePage } from '../_common';
import VideoListContainer from './VideoListContainer';

export default (props) => (
	<MobilePage>
		<VideoListContainer compact {...props} />
	</MobilePage>
);
