import React from 'react';
import { Container } from '../styled/Container';
import styled from 'styled-components';
import { Square } from '../components/atoms/Square';

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

const renderSquare = (i) => {
    return <Square value={i} key={`${i}__key`} />
}

export const Game = () => {
    return (
        <Container>
            <StyledGame>
                <div>
                    <h1>Крестики нолики</h1>
                    <p>Ход Крестиков</p>   
                </div>
                <div>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        renderSquare(i)
                    ))}
                </div>
            </StyledGame>
        </Container>
    );
}
