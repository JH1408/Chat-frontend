import React from 'react';
import classes from './WelcomeBackMessage.module.scss';

const WelcomeBackMessage = (props) => {

  return (
    !props.isVisible ? null : (
    <div className={classes.container}>
      <div className={classes.WelcomeBackModal}>
        <h2>Welcome back {props.user}!</h2>
      </div>
    </div>
  )
)
}

export default WelcomeBackMessage;
