import React from 'react';
import s from './AppHeader.module.scss';

export const AppHeader = () =>{
    return(
        <header className={[s.header,"App-header"].join(' ')}>
            <h1>Movie Searcher</h1>
        </header>
    )
}

 