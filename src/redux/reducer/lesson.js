import * as Types from '../action-types';
let initState = {
  lessonDetail:{},
  mylessonlist:[],
  error:'',
  success:'',
}

export default function (state = initState, action) {
  switch (action.type) {
    case Types.GET_LESSON_DETAIL:
      return {
        ...state,
        lessonDetail:action.lessonDetailData
      }
    case Types.SET_SUBSCIBE_ERROR:
      return {
        ...state,
        error:action.error,
        success:'',
      }
    case Types.SET_SUBSCIBE_SUCCESS:
      return {
        ...state,
        success:action.success,
        error:''
      }
    case Types.SET_MY_LESSONLIST:
      return {
        ...state,
        mylessonlist:action.mylessonlist
      }
    case Types.SET_USER_LOGOUT_INFO:
      return {
        ...state,
        mylessonlist:[],
      }
    case "@@router/LOCATION_CHANGE":// 路由切换页面
      return {
        ...state,
        success:'',
        error:'',
        lessonDetail:{},
      }
  }
  return state;
}
