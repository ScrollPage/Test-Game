import React, { useContext, useEffect } from 'react';
import { Container } from '../styled/Container';
import styled from 'styled-components';
import { Square } from '../components/atoms/Square';
import { Button } from 'antd';
import { GameContext } from '../context/game/GameContext';
import store from 'store';

const StyledGame = styled.div`
    padding-top: 20px;
    > div {
        &:first-of-type {
            text-align: center;
            p {
                padding-bottom: 10px;
            }
        }
        &:last-of-type {
            display: flex;
            flex-wrap: wrap;
            width: 300px; 
            margin: 0 auto;
        }
    }
`;

const StyledSearch = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;

export const Game = () => {

    const { isStart, loading, searchPlayer, desk, addDesk } = useContext(GameContext);

    useEffect(() => {
        store.set('isStart', isStart);
        store.set('desk', desk);
    },[isStart, desk]);

    const renderSquare = (index) => {
        return <Square value={desk[index]} key={`${index}__key`} onClick={() => addDesk(index)}/>
    };

    return (
        <Container>
            {console.log(desk)}
            {!isStart
                ? <StyledSearch>
                    <Button onClick={() => searchPlayer()}>Начать поиск соперника</Button>    
                </StyledSearch>
                : loading ? 'Загрузка...'
                    : <StyledGame>
                        <div>
                            <h1>Крестики нолики</h1>
                            <p>Ход Крестиков</p>
                        </div>
                        <div>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                renderSquare(i)
                            ))}
                        </div>
                    </StyledGame>}
        </Container>
    );
}
