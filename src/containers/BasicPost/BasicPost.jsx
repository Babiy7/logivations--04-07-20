import React from 'react';
import './BasicPost.css';

import { useParams, useHistory } from 'react-router-dom';
import withEffect from '../../hoc/withEffect';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import Collapse from '../../components/Collapse/Collapse';
import Fab from '../../components/UI/FabButton/FabButton';

function BasicPost(props) {
    const { loading, posts, error, comments } = props;
    const { id } = useParams();
    const history = useHistory();
    let content = null;

    const handleClick = () => {
        history.goBack();
    }
    
    const handleDelete = () => {
        history.goBack();
        props.delete(id);
    }

    if(loading) {
        content = <Spinner />;
    }

    if(error) {
        content = <Alert type='danger' message={error} />;
    }

    if(posts.length > 0) {   
        const [ post ] = posts.filter(post => post.id === +id);
        const { title, body } = post;
        content = ( 
           <>
                <div className="basic-post card">
                    <div className="basic-post__header card-header">
                        <button className="basic-post__return" onClick={handleClick} ></button>
                        <div className="basic-post__title" >{title ? title : null}</div>
                        <button className="basic-post__delete" onClick={handleDelete} ></button>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{body ? body : null}</p>
                    </div>
                    <Collapse comments={comments} id={post.id} />
                </div>
                <div className='basic-post__footer'>
                    <Fab type='edit' />
                </div>
          </>
        )
    }

    return content;
}

export default withEffect(BasicPost);
