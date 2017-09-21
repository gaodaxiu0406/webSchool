import * as Types from '../action-types';
let initState = {
    sliders: [],
    lessons: {
        lessonType: 'all',
        lessonList: [],
        hasMore: true,
        offset: 0,
        limit: 10,
        isLoading: false
    }
}
export default function (state = initState, action) {
    switch (action.type) {
        case Types.SET_LESSON_TYPE:
            return {
                ...state,
                lessons: {
                    ...state.lessons,
                    lessonType: action.val,
                    lessonList:[],
                    offset:0,
                    hasMore:true,
                }
            }
        case Types.GET_LESSON:
            return {
                ...state,
                lessons: {
                    ...state.lessons,
                    lessonList: [...state.lessons.lessonList, ...action.lessonList],
                    offset:state.lessons.offset+action.lessonList.length,
                    hasMore:action.lessonList.length<state.lessons.limit?false:true,
                    isLoading:false,
                }
            }
        case Types.SET_LOADING_STATUS:
            return {
                ...state,
                lessons:{
                    ...state.lessons,
                    isLoading:action.isLoading
                }
            }
    }
    return state;
}