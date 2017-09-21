import * as Types from '../action-types';
let initState = {
  userInfo: {},
  error: ''
}

export default function (state = initState, action) {
  switch (action.type) {
    case Types.SET_ERROR:
      return {
        ...state,
        error: action.error
      }
    case Types.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
        error: ''//设置用户信息后说明已经登录成功,将error信息清空
      }
    case Types.SET_USER_LOGOUT_INFO:
      return {
        ...state,
        userInfo: {},
        error:'',
        success:''
      }
    case "@@router/LOCATION_CHANGE":
      return {
        ...state,
        error:'',
      }
  }
  return state;
}
