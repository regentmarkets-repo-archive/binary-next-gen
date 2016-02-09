import React from 'react';
import MobilePage from '../mobile/MobilePage';
import ArticleContainer from './ArticleContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Article">
		<ArticleContainer {...props} />
	</MobilePage>
);
