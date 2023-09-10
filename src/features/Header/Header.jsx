import React from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm, selectFilteredPosts } from "../../store/redditSlice";
import { FaReddit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import './Header.css';


function Header() {
    let searchTerm = "";
    const dispatch = useDispatch();
    
    const onChangeHandler = (event) => {
        searchTerm = event.target.value;
    }
    
    const onSubmitHandler = () => {
        dispatch(setSearchTerm(searchTerm.trim()));
        console.log(searchTerm);
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