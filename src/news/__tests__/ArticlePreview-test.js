import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ArticlePreview from '../ArticlePreview';

describe('<ArticlePreview />', () => {
    it('should render ArticlePreview component properly', () => {
        const wrapper = shallow(<ArticlePreview description="Article Description" title="Article title" link="" />);
        expect(wrapper.render().text()).to.contain('Article title');
    });
});
