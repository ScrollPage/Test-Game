import React, { useContext, useEffect } from 'react';
import { AlertContext } from '../../context/alert/AlertContext';
import { motion } from 'framer-motion';
import { Alert } from 'antd';
import styled from 'styled-components';

const StyledAlert = styled(motion.div)`
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    z-index: 100;
    display: flex;
    justify-content: center;
`;

export const MyAlert = () => {

    const { alert, hide } = useContext(AlertContext);

    useEffect(() => {
        setTimeout(() => {
            hide()
        }, 4000);
        //eslint-disable-next-line
    }, [alert]);

    if (!alert) return null;

    return (
        <StyledAlert 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <Alert 
                type={alert.type || 'info'} 
                message={alert.text}
                closable
                onClose={hide}
            />
        </StyledAlert>
    );
}