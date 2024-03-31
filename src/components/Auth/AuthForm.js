import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {

    const emailInputRef = useRef();
    const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
   const [isLoading , setLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
   
  const submitHander =( event) =>{
     event.preventDefault();

     const enteredEmail = emailInputRef.current.value;
     const eneteredPassword = passwordRef.current.value;
      
         setLoading(true)
      if(isLogin){

      }
      else{
         const url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcHEQvELVkzD5YtZTewrLIlnhJOsKDEHo';
          
          fetch(url,{
                  method:'POST',
                  body: JSON.stringify({
                    email: enteredEmail,
                    password: eneteredPassword,
                    returnSecureToken	: true
                  }),
                  headers:{
                    'Content-type':'application/json'
                  }
          }
          ).then((res)=>{
                setLoading(false)
            if(res.ok){
            console.log('User added')
            }
            else{
               return res.json().then((data)=>{
                let errorMsg = 'Authentication Failed';
                 if(data && data.error && data.error.message){
                   errorMsg = data.error.message;
                 }
                  alert(errorMsg);
               })
          }});
      }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHander}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          <button type='submit'>    {!isLoading && isLogin ? 'Login' : 'Create Account'}
          </button>
          {isLoading && <p>sending Requsting...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
