import { 
    SET_LOADING,
    SEARCH_SUCCESS
} from '../types'

const handlers = {
    [SET_LOADING]: (state) => ({ ...state, loading: true }),
    [SEARCH_SUCCESS]: (state, {userName}) => ({ ...state, loading: false, userName: userName, isStart: true }),
    DEFAULT: state => state
}

export const GameReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}