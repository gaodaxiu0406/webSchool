import { combineReducers } from 'redux';
import home from './home';
import lesson from './lesson';
import user from './user';
import {routerReducer} from 'react-router-redux';
let reducers = combineReducers({
    home,
    lesson,
    user,
    router:routerReducer
});
export default reducers;