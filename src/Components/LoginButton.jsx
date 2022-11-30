import * as React from 'react';
import classes from "./LoginButton.module.css";

export default function LoginButton( {onClick}) {
  return (
         <button onClick={onClick} className={classes.LoginButton} variant="outlined">Login</button>
  );
}