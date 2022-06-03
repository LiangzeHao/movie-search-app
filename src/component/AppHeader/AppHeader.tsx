import React from 'react';
import logo from '../../logo.svg';
import s from './AppHeader.module.scss';

export const AppHeader = () =>{
    return(
        <header className={[s.header,"App-header"].join(' ')}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Movie Searcher</h1>
        </header>
    )
}

 