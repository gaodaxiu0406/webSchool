import * as Types from '../action-types';
import { getLessonDetails, subscibes, getSubLessonLists } from '../../api/lesson';
export const getLessonDetail = (detailUrl) => (dispatch, getState) => {
  getLessonDetails(detailUrl).then(lessonDetailData => {
    // lessonDetailData.description.replace(/\s/g,'<br/>');
    // lessonDetailData.catalog.replace(/\s/g,'<br/>');
    if (lessonDetailData === null) return;
    dispatch({
      type: Types.GET_LESSON_DETAIL,
      lessonDetailData
    })
  })
}

export const subscibe = (_id) => (dispatch) => {
  subscibes(_id).then(data => {
    if (data.error) {
      dispatch({
        type: Types.SET_SUBSCIBE_ERROR,
        error: data.error
      })
    } else {
      dispatch({
        type: Types.SET_SUBSCIBE_SUCCESS,
        success: data.success
      })
    }
  })
}
// 订阅课程列表
export const getSubLessonList = () => (dispatch) => {
  getSubLessonLists().then(docs=>{
    //console.log(docs);
    dispatch({
      type: Types.SET_MY_LESSONLIST,
      mylessonlist: docs
    })
  })
}