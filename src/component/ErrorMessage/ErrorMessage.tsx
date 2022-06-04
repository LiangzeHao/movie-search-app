import React from 'react';
import s from './ErrorMessage.module.scss';

interface Props{
    error:String
}

export const ErrorMessage:React.FC<Props> = ({error}) => {
    return(
        <div className={s.message}>
            <p>Ops, Something went wrong.</p>
            <p>{error}</p>
            <p>Please try another search.</p>
        </div>
    )
}