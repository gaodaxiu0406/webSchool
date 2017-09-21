import { get } from './index';
import host from './host';
export const getLessons = (type,limit,offset) => {
    return get(`${host}/getLesson/${type}/${limit}/${offset}`);
}
export const getSliders = () => {
    return get(`${host}/getSlider`);
}
