import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSelectedSubreddit } from "../../store/redditSlice";
import { FaReddit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import './Header.css';


function Header() {
    const [ savedSearchTerm, setSavedSearchTerm ] = useState('');
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onChangeHandler = (event) => {
        setSavedSearchTerm(event.target.value);
    }
    
    const onSubmitHandler = () => {
        dispatch(setSearchTerm(savedSearchTerm.trim()));
        console.log(savedSearchTerm);
        const query = savedSearchTerm;
        navigate(`${selectedSubreddit}/search?=${query}`);
    }
    
    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onSubmitHandler();
        }
    }

    return (
        <div className="header-box">
            <div className="title-box">
                <FaReddit className="reddit-icon"/>
                <h1 className="title"><span style={{ color: '#3243d9' }}>Reddit</span> Client</h1>
            </div>
            <form className="search-form" onSubmit={onSubmitHandler}>
                <input type="text" placeholder="Search" name="search" className="search-bar" onChange={onChangeHandler} onKeyDown={onKeyDown}/>
                <IoSearch className="search-button" type="submit" onClick={onSubmitHandler}/>
            </form>
        </div>
    );
};

export default Header;