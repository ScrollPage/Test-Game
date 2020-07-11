import React, { useReducer, useContext } from 'react';
import {
    SET_LOADING,
    SEARCH_SUCCESS,
    ADD_DESK,
    GAME_END
} from '../types';
import { GameContext } from './GameContext';
import { GameReducer } from './GameReducer';
import store from 'store';
// import axios from 'axios'
// import qs from 'qs';
// import { localhost } from '../../config'
import { AlertContext } from '../alert/AlertContext'

export const GameState = ({ children }) => {

    const { show } = useContext(AlertContext)

    const initialState = {
        desk: store.get('desk') === undefined ? Array(9).fill(null) : store.get('desk'),
        isStart: store.get('isStart') === undefined ? false : store.get('isStart'),
        loading: false,
        vsPlayer: null,
        xIsNext: true
    };

    const [state, dispatch] = useReducer(GameReducer, initialState);

    const searchPlayer = async () => {
        setLoading();
        searchSuccess('LEsha Xyusos');
        // const options = {
        //     method: 'PUT',
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

    const setLoading = () => dispatch({ type: SET_LOADING });

    const searchSuccess = (vsPlayer) => dispatch({ type: SEARCH_SUCCESS, vsPlayer });

    const addDesk = (index) => {
        const desk = state.desk.slice();
        if (state.desk[index]) {
            return;
        }
        desk[index] = state.xIsNext ? 'X' : 'O';
        dispatch({ type: ADD_DESK, desk });
        calculateWinner(desk);
    };

    const gameEnd = () => dispatch({ type: GAME_END });

    const calculateWinner = (desk) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (desk[a] && desk[a] === desk[b] && desk[a] === desk[c]) {
                show(`Победили ${desk[a] === 'O' ? 'Нолики' : 'Крестики'}`, 'success');
                gameEnd();
                return;
            }
        }
        return;
    };

    const { loading, vsPlayer, xIsNext, desk, isStart } = state;

    return (
        <GameContext.Provider value={{
            searchPlayer,
            addDesk,
            calculateWinner,
            loading, vsPlayer, xIsNext, desk, isStart
        }}>
            {children}
        </GameContext.Provider>
    );
}
