import React from 'react'
import {} from '../types'
import { GameContext } from './GameContext'
// import { GameReducer } from './GameReducer'
// import store from 'store'
// import axios from 'axios'
// import qs from 'qs';
// import {localhost} from '../../config'

export const GameState = ({ children }) => {

    // const initialState = {
    //     loading: false,
    // }

    // const [state, dispatch] = useReducer(GameReducer, initialState)

    // const {loading} = state

    return (
        <GameContext.Provider value={{}}>
            {children}
        </GameContext.Provider>
    )
}
