import React, { useState } from 'react';
import { Movie } from '../../interface/app_interface';
import s from './MovieCard.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface Props{
    movie:Movie
}
export const MovieCard:React.FC<Props> = ({movie}) =>{
    const [isSelected,setIsSelected] = useState<Boolean>(false)
    return(
        <div className={s.card}>
            <img 
                src={movie.Poster}
                alt={movie.Title}
            />
            <p className={s.title}>{movie.Title}</p>
            <p className={s.year}>{`(${movie.Year})`}</p>
            <FontAwesomeIcon 
                icon={["fas","heart"]}
                style={{color:isSelected?'red':'gray'}}
                onClick={()=>{
                    setIsSelected(!isSelected)
                }}    
            />
        </div>
    )
}
