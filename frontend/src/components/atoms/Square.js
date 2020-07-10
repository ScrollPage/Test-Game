import React from 'react';
import styled from 'styled-components';

const StyledSquare = styled.div`
    border: 1px solid #000;
    height: 200px;
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
`;

export const Square = ({value, onClick}) => {
    return (
        <StyledSquare onClick={() => onClick()}>
            {value}
        </StyledSquare>
    )
}
