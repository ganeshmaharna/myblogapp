import React from 'react'
import { createContext,useState,useContext} from 'react'
import { searchPost } from '../api/post';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationProvider';
const SearchContext = createContext();
const SearchProvider = ({children}) => {
    const [searchResult,setSearchResult]=useState([]);
    const navigate = useNavigate();
    const {updateNotification} = useNotification();
    const handleSearch = async(query)=>{
        const {error,posts} = await searchPost(query);
        if(error) return updateNotification('error', error);

        console.log(posts);
        setSearchResult(posts);
        navigate("/");
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
