import React from 'react'
import { createContext,useState,useContext} from 'react'
import { searchPost } from '../api/post';
const SearchContext = createContext();
const SearchProvider = ({children}) => {
    const [searchResult,setSearchResult]=useState([]);
    const handleSearch = async(query)=>{
        const {error,posts} = await searchPost(query);
        if(error) return console.log(error);
        console.log(posts);
        setSearchResult(posts);
    };
    const resetSearch =()=>{
        setSearchResult([]);
    };
  return (
    <SearchContext.Provider value={{searchResult,handleSearch,resetSearch}}>
      {children}
    </SearchContext.Provider>
  )
}
//This is a custom hook
export const useSearch = ()=>useContext(SearchContext);

export default SearchProvider
