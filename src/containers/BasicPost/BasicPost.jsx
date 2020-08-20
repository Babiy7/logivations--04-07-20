/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './BasicPost.css';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Form from '../../components/UI/Form/Form';
import Alert from '../../components/UI/Alert/Alert';
import Spinner from '../../components/UI/Spinner/Spinner';
import getPostAsync, { deletePost, editPost } from '../../store/actions/posts';
import { OPEN_SNACKBAR, SHOW_FILTER } from '../../store/actionTypes';

function ChangeContent(props) {
  const { handleEdit, post, handleChangeComponent } = props;

  return (
    <Card>
      <div className="change-content">
        <Form
          title="Edit post"
          btnTitle="edit"
          handleClick={handleEdit}
          post={post}
          handleClose={handleChangeComponent}
        />
      </div>
    </Card>
  );
}

function Content(props) {
  const {
    post, handleDelete, handleChangeComponent, comments,
  } = props;
  const [expanded, setExpanded] = useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className="basic-post">
      <CardHeader
        action={(
          <IconButton aria-label="settings" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
        title={post.title}
        subheader={post.date}
      />

      <CardContent className="basic-post__content">
        <Typography variant="body2" color="textSecondary" component="p">
          {post.body}
        </Typography>
      </CardContent>

      <CardActions className="basic-post__footer" disableSpacing>
        <div className="basic-post__information">
          <IconButton aria-label="edit" onClick={handleChangeComponent}>
            <EditIcon />
          </IconButton>
        </div>

        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List className="basic-post__list">
            {comments.map((comment) => (
              <>
                <ListItem key={comment.id}>
                  <ListItemText primary={comment.name} secondary={comment.email} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

function BasicPost(props) {
  const {
    postsState,
  } = props;
  const { id } = useParams();
  const post = postsState.posts.filter((p) => p.id === +id)[0];
  const [state, setState] = useState({ post: {}, change: false });
  const history = useHistory();
  let content = null;

  useEffect(() => {
    if (postsState.posts.length === 0) {
      props.getPost();
    }
    setState((s) => ({ ...s, post }));
  }, [props]);

  function handleDelete() {
    history.push('/');
    props.deletePost(id);
    props.openSnackbar(`Deleted post id:${id}`);
    props.showFilter();
  }

  function handleChangeComponent() {
    setState((s) => ({ ...s, change: !s.change }));
  }

  function handleEdit(newPost) {
    setState((s) => ({ post: { ...s.post, ...newPost }, change: !s.change }));
    props.editPost(id, { ...state.post, ...newPost });
    props.openSnackbar(`Changed post ${newPost.title}`);
  }

  if (postsState.loading) {
    content = <Spinner />;
  }

  if (postsState.error) {
    content = <Alert type="danger" message={postsState.error} />;
  }

  if (postsState.posts.length > 0 && state.post) {
    content = state.change
      ? (
        <ChangeContent
          post={state.post}
          handleEdit={handleEdit}
          handleChangeComponent={handleChangeComponent}
        />
      )
      : (
        <Content
          post={state.post}
          comments={post.comments}
          handleDelete={handleDelete}
          handleChangeComponent={handleChangeComponent}
        />
      );
  }

  return content;
}

const mapStateToProps = (state) => {
  const {
    postsState,
    uiState,
  } = state;

  return {
    postsState,
    uiState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPost: () => dispatch(getPostAsync()),
  deletePost: (id) => dispatch(deletePost(id)),
  editPost: (id, newPost) => dispatch(editPost(id, newPost)),
  openSnackbar: (message) => dispatch({ type: OPEN_SNACKBAR, payload: message }),
  showFilter: () => dispatch({ type: SHOW_FILTER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicPost);
