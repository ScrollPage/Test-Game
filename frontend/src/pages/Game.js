import React from 'react';
import { Container } from '../styled/Container';
import styled from 'styled-components';
import { Square } from '../components/atoms/Square';

const StyledGame = styled.div`
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    /* height: 600px; */
    width: 600px; 
    margin: 0 auto;
`;

const renderSquare = (i) => {
    return <Square value={i} key={`${i}__key`}/>
}

export const Game = () => {
    return (
        <Container>
            <StyledGame>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    renderSquare(i)
                ))}
            </StyledGame>
        </Container>
    );
}
