import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelectedSubreddit, selectSelectedSubreddit } from '../../store/redditSlice';
import { fetchSubreddits, selectSubreddits, selectSubredditsError } from '../../store/subRedditSlice';
import './Subreddits.css';
import { useNavigate, useParams } from 'react-router-dom';

function Subreddits() {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    const error =  useSelector(selectSubredditsError);
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    const handleClick = () => {
        navigate(selectedSubreddit);
    };
    
    useEffect(() => {
        handleClick();
    }, [selectedSubreddit])
    
    useEffect(() => {
        if (selectedSubreddit !== '/r/pics' && name !== undefined) {
            dispatch(changeSelectedSubreddit('/r/' + name));
        }
    }, []);
    
    if (error) {
        return (
            <h1 id='error'>There was an error loading the subreddits, please try again later.</h1>
        );
        } else {
            return (
                <div className='subreddit-box'>
                <h1 className='subreddit-title'>Subreddits</h1>
                {
                    subreddits.map(subreddit => {
                        return (
                            <div
                                className='subreddit'
                                key={subreddit.id}
                                
                                onClick={() => dispatch(changeSelectedSubreddit('/' + subreddit.display_name_prefixed))}
                            >
                                <img src={subreddit.icon_img} alt={subreddit.display_name} className='subreddit-icon'/>
                                <h2 className='subreddit-name'>{subreddit.display_name}</h2>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
};

export default Subreddits;