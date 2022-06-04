import React from 'react';
import s from './ErrorMessage.module.scss';

interface Props{
    error:String
}

export const ErrorMessage:React.FC<Props> = ({error}) => {
    return(
        <p>{error}</p>
    )
}