import React from 'react';
import MobilePage from '../containers/MobilePage';
import ExamineAssetCard from './ExamineAssetCard';

export default (props) => (
	<MobilePage>
		<ExamineAssetCard {...props} />
	</MobilePage>
);
