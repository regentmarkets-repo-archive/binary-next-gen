import React from 'react';
import expect from 'expect';
import { shallow,render } from 'enzyme';
//import configureStore from 'redux-mock-store';
//import DesktopPage  from '../DesktopPage';
/*
describe('DesktopPage',()=>{
	const middlewares = []; 
    const mockStore = configureStore(middlewares);
    const getState ={ state : { isAuthorized: true} } ;
    const store = mockStore(getState, []);	
    const wrapper = shallow(<DesktopPage store={store} isAuthorized="true">
			           				<span>Hello</span>
	           	    		</DesktopPage>);
	it('works',()=>{
		expect(wrapper.children().contains('Hello')).toEqual(true);
	});
});*/