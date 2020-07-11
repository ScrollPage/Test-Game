import { 
    SET_LOADING,
    SEARCH_SUCCESS,
    ADD_DESK,
    GAME_END
} from '../types'

const handlers = {
    [SET_LOADING]: (state) => ({ ...state, loading: true }),
    [GAME_END]: (state) => ({ ...state, desk: Array(9).fill(null), isStart: false, xIsNext: true}),
    [SEARCH_SUCCESS]: (state, {userName}) => ({ ...state, loading: false, userName: userName, isStart: true }),
    [ADD_DESK]: (state, {desk}) => ({...state, desk: desk, xIsNext: !state.xIsNext}),
    DEFAULT: state => state
}

export const GameReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}