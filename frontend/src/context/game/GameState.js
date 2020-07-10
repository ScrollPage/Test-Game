import React, { useReducer } from 'react';
import { 
    SET_LOADING,
    SEARCH_SUCCESS
 } from '../types';
import { GameContext } from './GameContext';
import { GameReducer } from './GameReducer';
import store from 'store';
import axios from 'axios'
// import qs from 'qs';
import {localhost} from '../../config'

export const GameState = ({ children }) => {

    const initialState = {
        desk: store.get('desk') === undefined ? Array(9).fill(null) : store.get(),
        isStart: false,
        loading: false,
        vsPlayer: null,
        xory: null
    };

    const [state, dispatch] = useReducer(GameReducer, initialState);

    const Search = async () => {
        setLoading();
        SearchSuccess('LEsha Xyusos');
        // const options = {
        //     method: 'GET',
        //     url: `${localhost}/search`
        // };
        // await axios(options)
        //     .then((response) => {
        //         SearchSuccess(response.data.username)
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    const setLoading = () => dispatch({type: SET_LOADING});

    const SearchSuccess = (vsPlayer) => dispatch({type: SEARCH_SUCCESS, vsPlayer}); 

    const {loading, vsPlayer, xory, desk, isStart} = state;

    return (
        <GameContext.Provider value={{
            Search,
            loading, vsPlayer, xory, desk, isStart
        }}>
            {children}
        </GameContext.Provider>
    );
}
