import React from 'react';
import Post from '../../components/Post/Post';
import './Posts.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import withEffect from '../../hoc/withEffect';

function Posts(props) {
    const { loading, posts, error, comments } = props;

    let content = null;

    if(loading) {
        content = <Spinner />
    } 
    
    if (error) {
        content = <Alert type='danger' message={error} />;
    } else {
        content =  
        <> 
            {posts ? posts.map(post => {
                const { id, title, body } = post;
                return <Post    
                            key={id} 
                            id={id} 
                            title={title} 
                            body={body} 
                            comments={comments} 
                        />}
            ) : null } 
       </>;
    }
   
    return (
        <div className='posts-wrapper'>
          {content}
        </div>
    )
}

export default withEffect(Posts);
