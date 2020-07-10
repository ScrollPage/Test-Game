import React, { useContext, useEffect } from 'react'
import { AlertContext } from '../../context/alert/AlertContext'
import { motion } from 'framer-motion'
import { Alert } from 'antd';

export const Alert = () => {

    const { alert, hide } = useContext(AlertContext)

    useEffect(() => {
        setTimeout(() => {
            hide()
        }, 2000)
        //eslint-disable-next-line
    }, [alert])

    if (!alert) return null

    return (
        <motion.div 
            className="alert-wrapper"
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
        </motion.div>
    )
}