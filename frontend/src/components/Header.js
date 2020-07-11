import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../styled/Container';
import styled from 'styled-components';
import { AuthContext } from '../context/auth/AuthContext';

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

    const { token, logout } = useContext(AuthContext);
    const isAuthenticated = !!token;
    
    return (
        <Container>
            <StyledHeader>
                <NavLink to="/" className="nav-link">Главная</NavLink>
                <NavLink to="/game" className="nav-link">Играть</NavLink>
                {isAuthenticated 
                ? <NavLink to="/" className="nav-link" onClick={() => logout()}>Выйти</NavLink>
                : <NavLink to="/log" className="nav-link">Войти</NavLink> }
                
            </StyledHeader>
        </Container>
    );
}
