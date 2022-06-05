import { Pagination } from '@mui/material';
import React from 'react';
import { Movie } from '../../interface/app_interface';
import { MovieCard } from '../MovieCard/MovieCard';
import s from './MovieCardList.module.scss';

interface Props{
    movies:Movie[],
    searchKeyword:String,
    totalResults:number,
    onPageChange:(event: React.ChangeEvent<unknown>, page: number) => void,
    page:number
}

export const MovieCardList:React.FC<Props> = ({movies, searchKeyword, totalResults, onPageChange, page}) =>{
    const numberOfPage = Math.ceil(totalResults/10);
    return(
        <div className={s.section}>
            <p className={s.searchMessage}>{`Found ${totalResults} result${totalResults>1?'s':''} for "${searchKeyword}"`}</p>
            <div className={s.list}>
                {movies.map(movie =>(
                    <MovieCard movie={movie} key={movie.imdbID}/>
                ))}
            </div>
            <div className={s.pagination}>
                <Pagination 
                    count={numberOfPage>100?100:numberOfPage} 
                    defaultPage={1}
                    variant="outlined" 
                    shape="rounded"
                    onChange={onPageChange}
                    page={page}
                />
            </div>
        </div>

    )
}
