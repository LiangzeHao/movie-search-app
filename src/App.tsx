import React,{useCallback, useReducer} from 'react';
import './App.scss';
import {AppHeader} from './component/AppHeader/AppHeader';
import { MovieCardList } from './component/MovieCardList/MovieCardList';
import { MovieSearchInput } from './component/MovieSearchInput/MovieSearchInput';
import { LoadingMessage } from './component/LoadingMessage/LoadingMessage';
import { ErrorMessage } from './component/ErrorMessage/ErrorMessage';
import { WelcomeMessage } from './component/WelcomeMessage/WelcomeMessage';
import {testMovies} from './App.data';

// Define initial state for movies reducer
const initialState = {
  isLoading:false,
  movies:[],
  totalResults:0,
  searchKeyword:'',
  errorMessage:null,
  page:1
}

// Define reducer to handle search movies request 
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
        searchKeyword:action.payload.searchKeyword,
        page:action.payload.page
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

  // Define function that fetch data from omdb by search keyword and store data into store
  const handleOnSearch = useCallback((searchKeyword:String,page:number=1) =>{
    dispatch(({type:"SEARCH_MOVIES_REQUEST"}));
    fetch(`https://www.omdbapi.com/?s=${searchKeyword}&apikey=9b0b0a6f&page=${page}`)
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.Response === 'True'){
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload:{
            movies:jsonResponse.Search,
            searchKeyword:searchKeyword,
            totalResults:jsonResponse.totalResults,
            page:page
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
  
  // When pagination number changes, search movies based on new pagination number
  const handleOnPageChange = ( event: React.ChangeEvent<unknown>, page: number)=>{
    handleOnSearch(searchKeyword,page)
  }

  const { movies, errorMessage, isLoading, totalResults, searchKeyword, page } = state;
  
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
          <MovieCardList 
            movies={movies} 
            totalResults={totalResults} 
            searchKeyword={searchKeyword}
            onPageChange={handleOnPageChange}
            page={page}  
          />
        )}
      </div>
    </div>
  );
}

export default App;
