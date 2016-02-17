import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Article from '../Article';

describe('Article', () => {
    it('should render the component properly', () => {
        const wrapper = shallow(<Article content="content" pubDate={(new Date()).toString()} title="Article Title"/>);
        expect(wrapper.render().text()).to.contain('Article Title');
    });
});
