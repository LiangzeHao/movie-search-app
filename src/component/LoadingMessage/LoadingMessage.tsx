import React from 'react';
import s from './LoadingMessage.module.scss';

export const LoadingMessage = () => {
    return(
        <div className={s.message}>
            <p>Loading...</p>
        </div>
    )
}
