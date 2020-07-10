import { } from '../types'

const handlers = {
    // [SET_FLAG]: (state) => ({ ...state, flag: !state.flag }),
    DEFAULT: state => state
}

export const GameReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}