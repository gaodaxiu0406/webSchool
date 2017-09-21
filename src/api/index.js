// 封装fetch方法
let get=(url)=>{
    return fetch(url,{
        method:'get',//获取的方法
        credentials:'include',//跨域携带cookie
        headers:{
            accept:'application/json'//接收的返回值类型是json
        }
    }).then(res=>res.json());
}
let post=(url,data)=>{
    return fetch(url,{
        method:'post',
        credentials:'include',
        headers:{
            "Content-Type":'application/json',
            accept:'application/json'
        },
        body:JSON.stringify(data),
    }).then(res=>res.json());
}
module.exports={get,post};