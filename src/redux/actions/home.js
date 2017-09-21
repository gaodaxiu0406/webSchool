import * as Types from '../action-types';
import { getLessons } from '../../api/home';
import store from '../store'
export const setLessonType = (val) => ({
    type: Types.SET_LESSON_TYPE,
    val
})


export const getLesson = () => (dispatch, getState) => {
    let { limit, offset, lessonType } = store.getState().home.lessons;
    dispatch({
        type:Types.SET_LOADING_STATUS,
        isLoading:true
    })
    getLessons(lessonType, limit, offset).then(lessonList => {
        dispatch({
            type: Types.GET_LESSON,
            lessonList
        })
    })
}
