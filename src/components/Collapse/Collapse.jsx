import React, { useState } from 'react';
import './Collapse.css';
import arrow from '../../assets/down-arrow.svg';

const Collapse = props => {
    const [open, setOpen] = useState(false);
    const comments = props.comments.filter(comment => props.id === comment.postId);

    console.log(props, comments);

    return (
        <>
            <div 
                className="collapse-container" 
                data-toggle="collapse" 
                data-target="#collapseExample" 
                aria-expanded="false" 
                aria-controls="collapseExample"
                onClick={() => setOpen(!open)}
            >
                <p>comments: {comments.length}</p>
                <img src={arrow} alt='arrow' className='collapse-container__arrow'
                        style={{transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}}
                />
            </div>
            <div className="collapse" id="collapseExample">
                <ul className="list-group">
                    {comments.map(comment => 
                   ( <li key={comment.id} className="list-group-item">
                        <div className="collapse__item" >
                            <p className="collapse__item-comment">{comment.name}</p>
                            <p className="collapse__item-email">{comment.email}</p> 
                        </div>
                    </li>)
                    )}  
                </ul>
            </div>
      </>
    )
}

export default Collapse;
