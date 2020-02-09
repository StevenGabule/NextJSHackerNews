import Comment from "./Comment";
import React from 'react';

export default ({comments}) => (
    <React.Fragment>
        {comments.map(comment => (
            <Comment key={comment.id} comment={comment}/>
        ))}
    </React.Fragment>
);
