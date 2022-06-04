import React from 'react';
import s from './WelcomeMessage.module.scss';

export const WelcomeMessage = () => {
    return(
        <div className={s.message}>
            <p>Explore unlimited movies, TV shows, and more!</p>
        </div>
    )
}
