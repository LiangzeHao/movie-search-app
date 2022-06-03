import React from 'react';
import { Movie } from '../../interface/app_interface';
import { MovieCard } from '../MovieCard/MovieCard';
import s from './MovieCardList.module.scss';

interface Props{
    movies:Movie[]
}

export const MovieCardList:React.FC<Props> = ({movies}) =>{
    return(
        <div>
            {movies.map(movie =>(
                <MovieCard movie={movie} key={movie.imdbID}/>
            ))}
        </div>
    )
}
