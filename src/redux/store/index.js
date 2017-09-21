// 基本的写法
/* import { createStore } from 'redux';
import reducers from '../reducer'
const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //配置redux devtools 插件用的
);
window.store=store;// 将store挂在window上,在控制台使用store.getState()可以查看仓库的状态
export default store;
 */

//  更高级的写法
import reducers from '../reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';//允许action自定义dispatch
import {routerMiddleware} from "react-router-redux";
import createHistory from 'history/createHashHistory';
let history =createHistory();
// 配置redux devtools插件用的(2个地方)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store=createStore(reducers, composeEnhancers( applyMiddleware(reduxThunk,routerMiddleware(history))));
window._store=store;
export default store;
