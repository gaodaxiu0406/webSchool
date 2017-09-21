import { get } from './index';
import host from './host';
export const getLessonDetails=(detailUrl)=>{
    return get(`${host}/getLessonDetail/?detailUrl=${detailUrl}`);
}

export const subscibes=(_id)=>{
    return get(`${host}/subscibe/${_id}`);
}

export const getSubLessonLists=()=>{
    return get(`${host}/subLessonList`);
}