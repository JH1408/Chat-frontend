import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import User from '../../components/User/User';
import Image from '../../assets/images/undraw_Group_chat_unwm.svg';
import classes from './LandingPage.module.scss';

const LandingPage = (props) => {

  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('user')
    username === undefined ? setUser(null) : setUser(username);
  }, [])

  const openModalHandler = () => {
    setIsVisible(true);
    setIsLoading(false);
    setIsError(false);
  }

  const closeModalHandler = () => {
    setIsVisible(false);
    setInputValue('');
  }

  const inputChangedHandler = (e) => {
    setInputValue(e.target.value);
    setIsError(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(inputValue.trim() === '') {
      setIsError(true);
    } else {
      setIsLoading(true);
      setUser(inputValue);
      localStorage.setItem('user', inputValue);
      props.history.replace('/chat');
    }
  }

  let button = <button onClick={openModalHandler}>Start chatting</button>
  if(user) {
    button = <button><Link to="/chat">Start chatting</Link></button>
  }

  return (
    <div className={classes.LandingPage}>
      <User
        isVisible={isVisible}
        hide={closeModalHandler}
        inputValue={inputValue}
        inputChanged={inputChangedHandler}
        submit={submitHandler}
        loading={isLoading}
        error={isError}/>
      <div className={classes.flexContainer}>
        <div>
          <h1>Chat App</h1>
          {button}
        </div>
        <div className={classes.Image}>
          <img src={Image} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
