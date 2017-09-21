import { get,post } from './index';
import host from './host';
// 注册
export const regs=(userInfo)=>{
    return post(`${host}/reg`,userInfo);
}
// 验证是否登录
export const auths=()=>{
    return get(`${host}/auth`);
}
// 注销登录
export const logouts=()=>{
    return get(`${host}/logout`);
}
// 登录
export const logins=(userInfo)=>{
    return post(`${host}/login`,userInfo);
}