import React from 'react';
import classes from './Comment.module.scss';

const Comment = (props) => {
  const form = (
    <form>
      <textarea value={props.commentValue ? props.commentValue : props.comment}
        onChange={props.changed}/>
      <button onClick={(e) => props.save(e, props.id, props.user)}>Save</button>
    </form>
  )

  return (
    <div className={classes.container}>
      <div>
        <div>
          <span className={classes.name}>{props.user}</span>
          <span className={classes.date}>{props.date}</span>
        </div>
        {props.editing && props.id === props.edited ? form : <p>{props.comment}</p>}
      </div>
      <div className={classes.edit}>
        <span onClick={() => props.edit(props.id)}>Edit</span>
        <span onClick={() => props.delete(props.id)}>Delete</span>
      </div>
      <hr/>
    </div>
  )
}

export default Comment;
