import React from 'react';
import styled from 'styled-components';

const StyledSquare = styled.div`
    border: 1px solid #000;
    height: 100px;
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    &:hover {
        cursor: pointer;
    }
`;

export const Square = ({value = null, onClick}) => {
    return (
        <StyledSquare onClick={() => onClick()}>
            {value}
        </StyledSquare>
    )
}
