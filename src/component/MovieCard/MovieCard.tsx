import { Chip, Stack } from '@mui/material';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Movie } from '../../interface/app_interface';
import s from './MovieCard.module.scss';

interface Props{
    movie:Movie
}

// Define initial state for movie reducer
const initialState = {
    isLoading:false,
    movieDetail:{},
    errorMessage:null
}
  
// Define reducer to handle get movie detail request 
const movieReducer = (state:any,action:any) =>{
    switch(action.type){
      case "GET_MOVIE_REQUEST":
        return{
          ...state,
          isLoading:true,
          errorMessage: null
        };
      case "GET_MOVIE_SUCCESS":
        return{
          ...state,
          isLoading:false,
          movieDetail:action.payload.movieDetail
        };
      case "GET_MOVIE_FAILURE":
        return{
          ...state,
          isLoading:false,
          errorMessage:action.error
        }
    }
}

export const MovieCard:React.FC<Props> = ({movie}) =>{
    const [isDetailOpen,setIsDetailOpen] = useState<Boolean>(false);
    const [state,dispatch] = useReducer(movieReducer,initialState);

    const {imdbID} = movie;
    const {movieDetail={}} = state;

    // Define function that send request to get movie data from omdb by movie imdbId
    const getMovie = (imdbID:String) =>{
        dispatch(({type:"GET_MOVIE_REQUEST"}));
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=9b0b0a6f`)
        .then(response => response.json())
        .then(jsonResponse => {
          if(jsonResponse.Response === 'True'){
            const {Response, Genre, ...rest} = jsonResponse;
            const GenreList = Genre.split(", ");
            dispatch({
              type: "GET_MOVIE_SUCCESS",
              payload:{
                movieDetail:{Genre:GenreList, ...rest},
              }
            });
          } else {
            dispatch({
              type:'SEARCH_MOVIES_FAILURE',
              error: jsonResponse.Error
            });
          }
        });
    }

    // When detail button is open, send get movie request and update data 
    useEffect(()=>{
        if(isDetailOpen){
            getMovie(imdbID)
        }
    },[imdbID, isDetailOpen])

    return(
        <div className={[isDetailOpen?s.isOpen:'',s.card].join(' ')}>
            <img 
                src={movie.Poster}
                alt={movie.Title}
            />
            <div className={s.movieInfo}>
                <p className={s.title}>{movie.Title}</p>
                <p className={s.year}>{`(${movie.Year})`}</p>
                {isDetailOpen && Object.keys(movieDetail).length !== 0 &&(
                    <Fragment>
                        <div className={s.date}>
                            <p>Release Date</p>
                            <p>{movieDetail.Released}</p>
                        </div>
                        <div className={s.genre}>
                            <p>Genre</p>
                            <Stack direction="row" spacing={1}>
                                {movieDetail.Genre.map((genreItem:String,index:number)=>(
                                    <Chip label={genreItem} color={"error"} key={index}/>
                                ))}
                            </Stack>
                        </div>
                        <div className={s.director}>
                            <p>Director</p>
                            <p>{movieDetail.Director}</p>
                        </div>
                        <div className={s.rating}>
                            <p>IMDB Rating</p>
                            <p>{movieDetail.imdbRating}</p>
                        </div>
                    </Fragment>
                )}
                <button 
                    className={s.detailButton}
                    onClick={()=>{setIsDetailOpen(!isDetailOpen)}}
                >{isDetailOpen?"Close":"More Info"}</button>
            </div>
        </div>
    )
}
