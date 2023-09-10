import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectPosts, fetchPosts, fetchComments, selectComments } from '../../store/redditSlice';
import Comment from '../Comment/Comment';
import { FaRegMessage } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const comments = useSelector(selectComments);
    const [id, setId] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        if (name === 'pics') {
            dispatch(fetchPosts('/r/pics'));
        }
    }, [name, dispatch])

    useEffect(() => {
        console.log(name);
        if (name !== 'pics') {
            dispatch(fetchPosts('/r/' + name));
        }
    }, [name, dispatch]);
    
    const handleComments = (permalink, id) => {
        console.log(permalink);
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

    useEffect(() => {
        console.log(comments);
    }, [comments])
    
    return (
        <div className='home'>
            {
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
            }
        </div>
    )
};

export default Home;