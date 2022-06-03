import React from 'react';
import './App.scss';
import {AppHeader} from './component/AppHeader/AppHeader';
import { MovieCardList } from './component/MovieCardList/MovieCardList';
import { MovieSearchInput } from './component/MovieSearchInput/MovieSearchInput';
import {testMovies} from './App.data';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <div className="AppSearchSection">
        <MovieSearchInput/>
      </div>
      <div className="AppMovieSection">
        <MovieCardList movies={testMovies}/>
      </div>
    </div>
  );
}

export default App;
