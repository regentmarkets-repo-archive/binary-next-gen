import React from 'react';
import MobilePage from '../containers/MobilePage';
import ExamineAssetContainer from './ExamineAssetContainer';

export default props => (
    <MobilePage>
        <ExamineAssetContainer {...props} />
    </MobilePage>
);
