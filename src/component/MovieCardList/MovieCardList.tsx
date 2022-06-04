import React from 'react';
import { Movie } from '../../interface/app_interface';
import { MovieCard } from '../MovieCard/MovieCard';
import s from './MovieCardList.module.scss';

interface Props{
    movies:Movie[],
    searchKeyword:String,
    totalResults:number
}

export const MovieCardList:React.FC<Props> = ({movies,searchKeyword,totalResults}) =>{
    return(
        <div className={s.section}>
            <p className={s.searchMessage}>{`Find ${totalResults} result${totalResults>1?'s':''} for "${searchKeyword}"`}</p>
            <div className={s.list}>
                {movies.map(movie =>(
                    <MovieCard movie={movie} key={movie.imdbID}/>
                ))}
            </div>
        </div>

    )
}
