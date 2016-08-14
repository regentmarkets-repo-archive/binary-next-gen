import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ArticleFull from '../ArticleFull';

describe('<ArticleFull />', () => {
    it('should render the component properly', () => {
        const props = {
            articles: [{ title: 'Article 1', pubDate: '2001-11-02', description: 'Desc' },
                { title: 'Article Title', pubDate: '2001-11-02', description: 'Desc' }],
            params: { index: 1 },
        };

        const wrapper = shallow(<ArticleFull {...(props)} />);
        expect(wrapper.render().text()).to.contain('Article Title');
    });
});
