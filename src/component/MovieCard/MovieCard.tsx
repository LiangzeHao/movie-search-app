import React from 'react';
import { Movie } from '../../interface/app_interface';
import s from './MovieCard.module.scss';

interface Props{
    movie:Movie
}
export const MovieCard:React.FC<Props> = ({movie}) =>{
    return(
        <div className={s.card}>
            <img 
                src={movie.Poster}
                alt={movie.Title}
            />
            <p className={s.title}>{movie.Title}</p>
            <p className={s.year}>{`(${movie.Year})`}</p>
            <button>More Info</button>
        </div>
    )
}
