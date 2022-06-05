import { Pagination } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Movie } from '../../interface/app_interface';
import { Size, useWindowSize } from '../../lib/useWindowSize';
import { MovieCard } from '../MovieCard/MovieCard';
import { MovieCardCarousel } from '../MovieCardCarousel/MovieCardCarousel';
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

    // Check screen size for responsive design
    // Render card carousel if current window is phone screen
    // Otherwise, render card list
    const size: Size = useWindowSize();
    const isScreenSizePhone = size.width?size.width<429:false;

    return(
        <div className={s.section}>
            <p className={s.searchMessage}>{`Found ${totalResults} result${totalResults>1?'s':''} for "${searchKeyword}"`}</p>
            <p className={s.showMessage}>{`Showing result ${(page-1)*10+1} to ${page*10<totalResults?page*10:totalResults}`}</p>
            {isScreenSizePhone?
                <MovieCardCarousel movies={movies}/>
            :<div className={s.list}>
                {movies.map(movie =>(
                    <MovieCard movie={movie} key={movie.imdbID}/>
                ))}
            </div>
            }
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
