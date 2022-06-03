import React from 'react';
import { Movie } from '../../interface/app_interface';
import s from './MovieCard.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface Props{
    movie:Movie
}
export const MovieCard:React.FC<Props> = ({movie}) =>{
    return(
        <div>
            <img 
                src={movie.Poster}
                alt={movie.Title}
            />
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
            <FontAwesomeIcon icon={["fas","heart"]}/>
        </div>
    )
}
