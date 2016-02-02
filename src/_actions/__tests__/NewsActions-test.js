import * as types from '../../_constants/ActionTypes';
import {updateCurrentDailyReport,updateNewsList} from '../NewsActions';
import expect from 'expect';

describe('NewsActions',()=>{
  it('should updateCurrentDailyReport',()=>{
    const dr = {
      title: 'updateCurrentDailyReport',
      dateTime: new Date('2001-01-02'),
      content: 'Signup Process Now Updated, for Tighter Security',
    };
    const expectedActions = {
      type: types.UPDATE_CURRENT_DAILY_REPORT,
      current: dr,
    };
    expect(updateCurrentDailyReport(dr)).toEqual(expectedActions);
  });

  it('should updateNewsList', ()=>{
    const articles =['Binary.com Commemorates 300,000 Facebook Fans!','Signup Process Now Updated, for Tighter Security'];

    const expectedActions = {
      type: types.UPDATE_NEWS_LIST,
      articles: articles
    };
    expect(updateNewsList(articles)).toEqual(expectedActions);
  });
});
