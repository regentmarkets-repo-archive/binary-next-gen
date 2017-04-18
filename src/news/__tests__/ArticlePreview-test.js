import React from 'react';
import { shallow } from 'enzyme';
import ArticlePreview from '../ArticlePreview';

describe('<ArticlePreview />', () => {
    it('should render ArticlePreview component properly', () => {
        const wrapper = shallow(
            <ArticlePreview
                description="Article Description"
                title="Article title"
                url=""
            />,
        );
        expect(wrapper.render().text()).toContain('Article title');
    });
});
