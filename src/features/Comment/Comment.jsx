import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import './Comment.css';

function Comment({ comments }) {
    return (
        <div className="comment-box">
            {
                comments.map(comment => {
                    return (
                        <div key={comment.id} className='comment'>
                            <h2 className='comment-author'>{comment.author}</h2>
                            <ReactMarkdown className='comment-text'>{comment.body}</ReactMarkdown>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Comment;