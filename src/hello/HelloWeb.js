import React from 'react';
import WebPage from '../containers/WebPage';
import HelloCard from './HelloCard';

export default (props) => (
    <WebPage toolbarShown={false} inverse>
        <HelloCard {...props} />
    </WebPage>
);

