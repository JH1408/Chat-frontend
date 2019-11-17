import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import XIcon from '../UI/XIcon/XIcon';
import Loading from '../UI/Loading/Loading';
import classes from './User.module.scss';

const User = (props) => {
  return (
    !props.isVisible ? null : (
    <div className={classes.container}>
      <Backdrop show={true} clicked={props.hide}/>
      <div className={classes.UserModal}
          style={{
          transform: true ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: true ? '1' : '0'
        }}>
        <XIcon clicked={props.hide}/>
        <h2>Please enter your username.</h2>
        <form>
          <input
            onChange={props.inputChanged}
            value={props.inputValue}
            placeholder="Your username"/>
          {props.error ? <p>Username can't be empty.</p> : null}
          <button onClick={props.submit}>{props.loading ? <Loading /> : 'Submit'}</button>
        </form>

      </div>
    </div>
  )
)
}

export default User;
