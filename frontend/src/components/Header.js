import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../styled/Container';
import styled from 'styled-components';

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px 0px;
    .nav-link {
        margin-left: 20px;
        &:first-child {
            margin-left: 0px;
        }
    }
`;

export const Header = () => {
    return (
        <Container>
            <StyledHeader>
                <NavLink to="/" className="nav-link">Главная</NavLink>
                <NavLink to="/game" className="nav-link">Играть</NavLink>
                <NavLink to="/log" className="nav-link">Вход</NavLink>
            </StyledHeader>
        </Container>
    );
}
