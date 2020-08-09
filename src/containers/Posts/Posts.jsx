import React, { useState } from 'react';
import Post from '../../components/Post/Post';
import './Posts.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import Fab from '../../components/UI/FabButton/FabButton';
import withEffect from '../../hoc/withEffect';
import Modal from '../../components/UI/Modal/Modal';
import AddPost from '../../containers/AddPost/AddPost';

function Posts(props) {
    const [open, setOpen] = useState(false);
    const { loading, posts, error, comments } = props;
    let content = null;

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

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
        <div className='posts'>
            {content}
            <div className='posts__footer'>
                <Fab type='add' handleOpen={handleOpen} />
            </div>
            <Modal open={open} handleClose={handleClose} >
                <AddPost handleClose={handleClose} />
            </Modal>
        </div>
    )
}

export default withEffect(Posts);
