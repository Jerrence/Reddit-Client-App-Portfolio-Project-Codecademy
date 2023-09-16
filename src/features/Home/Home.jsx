import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredPosts,  fetchPosts, fetchComments, selectComments, selectSelectedSubreddit, setSearchTerm } from '../../store/redditSlice';
import Comment from '../Comment/Comment';
import { FaRegMessage } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const comments = useSelector(selectComments);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    const [id, setId] = useState(null);
    const navigate = useNavigate();
    const { name } = useParams();

    useEffect(() => {
        if (name === 'pics') {
            dispatch(fetchPosts('/r/pics'));
        }
    }, [name, dispatch])

    useEffect(() => {
        if (name !== 'pics') {
            dispatch(fetchPosts('/r/' + name));
        }
    }, [name, dispatch]);

    const handleComments = (permalink, id) => {
        dispatch(fetchComments(permalink));
        setId(id);
    }

    const renderComments = (currentId) => {
        if (id === currentId) {
            return (
                <Comment comments={comments}/>
            )
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(setSearchTerm(''));
        navigate(selectedSubreddit);
    }

    const noResult = () => {
        return (
            <div className='no-result-box'>
                <h1 className='message'>No results</h1>
                <button onClick={handleClick} className='home-button'>Go Home</button>
            </div>
        )
    }

    
    return (
        <div className='home'>
            {   posts.length !== 0 ?
                posts.map(post => {
                    return (
                        <div className='post-box' key={post.id}>
                            <h1 className="post-title">{post.title + '\n'}</h1>
                            <img className='post-img' src={post.url} alt='' />
                            <div className='footer'>
                                <p className='post-author'>by {post.author}</p>
                                <FaRegMessage className='comment-button' onClick={() => handleComments(post.permalink, post.id)}/>
                            </div>
                            {renderComments(post.id)}
                        </div>
                    );
                })

                :

                noResult()
            }
        </div>
    )
};

export default Home;