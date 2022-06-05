import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Movie } from '../../interface/app_interface';
import { MovieCard } from '../MovieCard/MovieCard';
import s from './MovieCardCarousel.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

interface Props{
    movies:Movie[]
}
export const MovieCardCarousel:React.FC<Props> = ({movies}) =>{
    return(
        <Carousel 
            className={s.carousel}
        >
            {movies.map(movie=>(
                <div className={s.slide} key={movie.imdbID}>
                    <MovieCard movie={movie}/>
                </div>
            ))}
        </Carousel>
    )
}
