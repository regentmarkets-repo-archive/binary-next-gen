import expect from 'expect';
import {changeActiveVideo,updateVideoList} from '../VideoActions';
import { CHANGE_ACTIVE_VIDEO, UPDATE_VIDEO_LIST } from '../../_constants/ActionTypes';

describe('VideoActions', ()=>{
  it('should changeActiveVideo',()=>{
    const expectedAction = {
      type: CHANGE_ACTIVE_VIDEO,
      activeTitle: 'Jarumin Maza Song',
      activeUrl: 'https://www.youtube.com/watch?v=9ckSyr-PFMw',
    };
    expect(changeActiveVideo('Jarumin Maza Song','https://www.youtube.com/watch?v=9ckSyr-PFMw')).toEqual(expectedAction);
  });

  it('should updateVideoList',()=>{
    const videos = ['Ranar aure na song', 'maza maza'];
    const expectedAction = {
      type: UPDATE_VIDEO_LIST,
      videos: videos,
    };
    expect(updateVideoList(videos)).toEqual(expectedAction);
  });
});
