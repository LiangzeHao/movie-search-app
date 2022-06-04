import React, { useState } from 'react';
import s from './MovieSearchInput.module.scss';

interface Props{
    onSearch:Function
}

export const MovieSearchInput:React.FC<Props> = ({onSearch}) =>{
    const [searchKeyword,setSearchKeyword] = useState('');
    const handleOnInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setSearchKeyword(e.target.value)
    }
    const handleOnSubmit = () =>{
        if(searchKeyword!==''){
            onSearch(searchKeyword)
        }
    }
    return(
        <div>
            <input
                value={searchKeyword}
                onChange={handleOnInputChange}
                type="text"
            />
            <button
                onClick={handleOnSubmit}
            >
                Search
            </button>
        </div>

    )
}
