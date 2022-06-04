import React,{useReducer} from 'react';
import './App.scss';
import {AppHeader} from './component/AppHeader/AppHeader';
import { MovieCardList } from './component/MovieCardList/MovieCardList';
import { MovieSearchInput } from './component/MovieSearchInput/MovieSearchInput';
import { LoadingMessage } from './component/LoadingMessage/LoadingMessage';
import { ErrorMessage } from './component/ErrorMessage/ErrorMessage';
import { WelcomeMessage } from './component/WelcomeMessage/WelcomeMessage';

const initialState = {
  isLoading:false,
  movies:[],
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
        movies:action.payload
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

  const handleOnSearch = (searchKeyword:String) =>{
    dispatch(({type:"SEARCH_MOVIES_REQUEST"}));
    fetch(`https://www.omdbapi.com/?s=${searchKeyword}&apikey=9b0b0a6f`)
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.Response === 'True'){
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload:jsonResponse.Search
        });
      } else {
        dispatch({
          type:'SEARCH_MOVIES_FAILURE',
          error: jsonResponse.Error
        });
      }
    });
  }
  
  const { movies, errorMessage, isLoading } = state;
  
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
          <MovieCardList movies={movies}/>
        )}
      </div>
    </div>
  );
}

export default App;
