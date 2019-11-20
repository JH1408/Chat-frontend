import React, {useEffect, useState, useRef} from 'react';
import qs from 'querystring';
import moment from 'moment';
import axios from '../../api';
import WelcomeBackMessage from '../../components/WelcomeBackMessage/WelcomeBackMessage';
import Comment from '../../components/Comment/Comment';
import classes from './Chat.module.scss';
import useInterval from '../../hooks/useInterval';

const Chat = (props) => {

  const [user, setUser] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(null);
  const [commentValue, setCommentValue] = useState(null);

  const commentsBottom = useRef(null);

  useEffect(() => {
    checkUser();
    getComments();
  }, []);

  useEffect(() => {
    if(!isEditing) {
      scrollToBottom();
    }
  }, [comments, isEditing])

  useInterval(() => {
    getComments();
  }, 2000);

  const checkUser = () => {
    const username = localStorage.getItem('user');
    if(username === null) {
      props.history.replace('/');
    } else {
      setUser(username);
    }
  }

  const scrollToBottom = () => {
    commentsBottom.current.scrollIntoView({behavior: 'smooth'});
  }

  const inputChangedHandler = (e) => {
    setInputValue(e.target.value);
  }

  const getComments = () => {
    setIsError(false);
    axios.get('/comments')
    .then(res => setComments(res.data))
    .catch(err => setIsError(true))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(inputValue.trim() === '') {
      return
    }
    const data = {name: user, text: inputValue}
    setIsError(false);
    axios.post('/comments', qs.stringify(data))
    .then(res => {
      getComments();
      setInputValue('');
    })
    .catch(err => setIsError(true))
  }

  const enterHandler = (e) => {
    if(e.which === 13) {
      submitHandler(e);
    }
  }

  const deleteHandler = (id) => {
    setIsError(false);
    setIsEditing(false);
    axios.delete(`/comment/${id}`)
    .then(res => getComments())
    .catch(err => setIsError(true));
  }

  const editHandler = (id) => {
    setEditedComment(id);
    setIsEditing(true);
  }

  const CommentChangedHandler = (e) => {
    setCommentValue(e.target.value);
  }

  const saveCommentHandler = (e, id, username) => {
    e.preventDefault();
    setIsError(false);
    if(commentValue.trim() === '') {
      setIsEditing(false);
    }
    const data = {name: username, text: commentValue}
    axios.put(`/comment/${id}`, qs.stringify(data))
    .then(res => {
      setIsEditing(false);
      getComments();
      setCommentValue('');
    })
    .catch(err => setIsError(true));
  }

  let message = null;
  if (props.history.action === 'PUSH') {
    message = <WelcomeBackMessage user={user} isVisible={isVisible}/>
     setTimeout(() => {
          setIsVisible(false);
       }, 1000);
  }

  const commentList = comments !== null ? comments.map(comment => {
    const date = moment(comment.dateAdded).format('MMMM Do YYYY, h:mm a')
    return (
      <Comment
          key={comment.id}
          id={comment.id}
          user={comment.name}
          date={date}
          comment={comment.text}
          delete={deleteHandler}
          edit={editHandler}
          editing={isEditing}
          edited={editedComment}
          changed={CommentChangedHandler}
          commentValue={commentValue}
          save={saveCommentHandler}
          />
    )
  }) : null;

  return (
    <div className={classes.Chat}>
      <h1>Chat App</h1>
      {isError ? <p className={classes.error}>Something went wrong. Please try again.</p> : null}
      {message}
      <div className={classes.commentList}>
        {commentList}
        <div ref={commentsBottom}></div>
      </div>
      <div className={classes.inputContainer}>
        <textarea
          placeholder="Send a message"
          value={inputValue}
          onChange={inputChangedHandler}
          className={classes.messageInput}
          onKeyDown={enterHandler}/>
        <button onClick={submitHandler}>Send</button>
      </div>
    </div>
  )
}

export default Chat;
