import React from 'react';
import s from './AppHeader.module.scss';

export const AppHeader = () =>{
    return(
        <header className={[s.header,"App-header"].join(' ')}>
            <h1>M<span>oo</span>vI<span>e</span></h1>
        </header>
    )
}

 