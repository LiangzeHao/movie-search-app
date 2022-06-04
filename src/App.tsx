import React,{useCallback, useReducer} from 'react';
import './App.scss';
import {AppHeader} from './component/AppHeader/AppHeader';
import { MovieCardList } from './component/MovieCardList/MovieCardList';
import { MovieSearchInput } from './component/MovieSearchInput/MovieSearchInput';
import { LoadingMessage } from './component/LoadingMessage/LoadingMessage';
import { ErrorMessage } from './component/ErrorMessage/ErrorMessage';
import { WelcomeMessage } from './component/WelcomeMessage/WelcomeMessage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {testMovies} from './App.data';

library.add(fas)

const initialState = {
  isLoading:false,
  movies:testMovies,
  totalResults:0,
  searchKeyword:'',
  errorMessage:null
}

const reducer = (state:any,action:any) =>{
  switch(action.type){
    case "SEARCH_MOVIES_REQUEST":
      return{
        ...state,
        isLoading:true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return{
        ...state,
        isLoading:false,
        movies:action.payload.movies,
        totalResults:action.payload.totalResults,
        searchKeyword:action.payload.searchKeyword
      };
    case "SEARCH_MOVIES_FAILURE":
      return{
        ...state,
        isLoading:false,
        errorMessage:action.error
      }
  }
}

const App = () => {
  const [state,dispatch] = useReducer(reducer,initialState);

  const handleOnSearch = useCallback((searchKeyword:String) =>{
    dispatch(({type:"SEARCH_MOVIES_REQUEST"}));
    fetch(`https://www.omdbapi.com/?s=${searchKeyword}&apikey=9b0b0a6f`)
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.Response === 'True'){
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload:{
            movies:jsonResponse.Search,
            searchKeyword:searchKeyword,
            totalResults:jsonResponse.totalResults
          }
        });
      } else {
        dispatch({
          type:'SEARCH_MOVIES_FAILURE',
          error: jsonResponse.Error
        });
      }
    });
  },[])
  
  const { movies, errorMessage, isLoading, totalResults, searchKeyword } = state;
  
  return (
    <div className="App">
      <AppHeader/>
      <div className="AppSearchSection">
        <MovieSearchInput onSearch={handleOnSearch}/>
      </div>
      <div className="AppMovieSection">
        { isLoading && !errorMessage ? (
          <LoadingMessage/>
        ): errorMessage ? (
          <ErrorMessage error={errorMessage}/>
        ): movies.length===0 ?(
          <WelcomeMessage/>
        ):(
          <MovieCardList movies={movies} totalResults={totalResults} searchKeyword={searchKeyword}/>
        )}
      </div>
    </div>
  );
}

export default App;
