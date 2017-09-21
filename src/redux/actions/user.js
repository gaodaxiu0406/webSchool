import * as Types from '../action-types';
import { regs,logins,auths,logouts } from '../../api/user';
import util from '../../common/util';
import {push} from 'react-router-redux';
// 注册
export const reg = (userInfo) => (dispatch) => {
    //console.log(userInfo);
    regs(userInfo).then(data => {
        //console.log(data);
        if (data.error) {
            dispatch({
                type: Types.SET_ERROR,
                error: data.error
            })
        } else {
            util.set('userInfo',data);//存到sessionStorage中,做同步验证的时候使用这个数据
            dispatch({
                type: Types.SET_USER_INFO,
                userInfo: data,                
            })
            dispatch(push('/profile'));
        }
    })
}

// 登录
export const login=(userInfo)=>(dispatch)=>{
    logins(userInfo).then(data=>{
        //console.log(data);
        if(data.error){
            dispatch({
                type:Types.SET_ERROR,
                error:data.error
            })
        }else{
            util.set('userInfo',data);
            dispatch({
                type:Types.SET_USER_INFO,
                userInfo:data
            });
            dispatch(push('/profile'));//使用了react-router-redux后就可以跳转了

        }
    })
}

// 验证是否登录
export const auth=()=>(dispatch)=>{
    auths().then(data=>{
        // 返回的data是个对象,没登录为{},登录了为{username,password...}
        if(data.username){
            util.set('userInfo',data);
            dispatch({
                type:Types.SET_USER_INFO,
                userInfo:data
            })
        }else{
            // 没登录跳到登录页面
            dispatch(push('/login'))
        }
    })
}

// 注销登录
export const logout=()=>(dispatch)=>{
    logouts().then(data=>{
        // 返回的data是空对象
        util.set('userInfo',data);
        dispatch({
            type:Types.SET_USER_LOGOUT_INFO,
            userInfo:data
        })
    })
}