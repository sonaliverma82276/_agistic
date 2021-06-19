import React, { useCallback, useContext,useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebase/firebase.js";

import './Login.css';
import Navbar from '../Navbar/Navbar';

const Login = ({history}) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push({
          pathname: '/'
        });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  // const { currentUser } = useContext(AuthContext);

  // if (currentUser) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="main_top">
      <Navbar/>

{/* <!-- Login form --> */}
<div className="container-fluid padding main" id="main">
    <div className="row padding">
		<div className="col-md-6 left">
            <div className="left_div">
                <h2>Welcome to Agistic!</h2>
                <h4 style={{color: 'white'}}>Trace your Product</h4>
            </div>
		</div>
        <div className="col-md-6 right">
                <form onSubmit={handleLogin} >
                  <div className="form-group">
                    <label for="username">Username</label>
                    <input className="form-control" type="text" name="username" id="username" placeholder="Aashi Shukla" required />
                  </div>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input className="form-control" type="text" name="name" id="email" placeholder="aashishukla@gmail.com" required />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input className="form-control" type="password" name="password" id="password" placeholder="********" required />
                  </div>
                  <div className="row">
                      <div className="col-12" style={{textAlign: 'center'}}>
                        <button type="button" className="btn btn--form" type="submit">Login</button>
                      </div>
                      <div className="col-12" style={{textAlign: 'center'}}>
                        <p className="signup__link">Dont have an account? <a href="/signup" style={{color: 'blue',textDecoration: 'none'}}>Singup Here</a></p>
                      </div>
                  </div>
                </form>  
		</div>
	</div>
</div>
<div></div>
    </div>
  );
}

export default Login;
