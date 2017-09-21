// 写读取和设置sessionStorage的方法
// sessionStorage中存放的是字符串,如果要存的是个对象,需要先JSON.stringify转为字符串,取出时JSON.parse为对象
// 如果用key取到的字符串值外面包裹了{},说明是个JSON对象,用JSON.parse解析出来
export default {
  get(key) {
    let value = sessionStorage.getItem(key) || '';
    if (value.startsWith('{') || value.startsWith('[')) {
      value = JSON.parse(value);
    }
    return value;
  },
  // 如果设置的value是个对象,变成字符串
  set(key, value) {
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
  }
}