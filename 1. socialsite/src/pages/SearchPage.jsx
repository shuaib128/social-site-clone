import React, { useEffect, useState } from 'react'
import SearchPosts from '../components/SearchPosts'
import { BackendHost } from '../Api/BackendHost';
import { useLocation } from 'react-router-dom';

const SearchPage = (props) => {
    const {search} = useLocation()
    const [searchData, setSearchData] = useState([]);
    const [searchDatassss, setsearchDatassss] = useState(props.searchDataInput);

    useEffect(() => {
        fetch(`${BackendHost}/api/posts/post/search/?search=${search.substring(1)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            setSearchData(data);
        })
        .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <SearchPosts posts={searchData}/>
        </div>
    )
}

export default SearchPage
