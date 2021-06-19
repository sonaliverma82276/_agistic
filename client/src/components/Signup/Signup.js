import React, {useCallback, useState, useEffect } from "react";
// import { withRouter } from "react-router";
import app from "../firebase/firebase.js";

import './Signup.css';
import Navbar from '../Navbar/Navbar';

const Signup = ({history}) => {
  const [type,setType]=useState('nouser');

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    // console.log(type);
    const { email, password , types } = event.target.elements;
    console.log(types.value);
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).then((USER) => {
          // Signed in 
          app.auth().onAuthStateChanged(function(user){ 
              if (user) { 
                // User is signed in.
               var id= user.uid;
               var email=user.email;
                 //  window.alert("welcome "+id);
               app.database().ref('users/' + id).set({
                    username: document.getElementById("username").value,
                    email: email,
                    type :types.value,
              }, (error) => {
                if (error) {
                  // The write failed...
                  console.log("failed");
                  window.alert("Please, try again or check your login credentials!");
                } else {
                  // Data saved successfully!
                  console.log("done!!");
                  history.push("/");
                }
              }); 
             } else {
                // No user is signed in.
                 }
             });
       })
       .catch((FirebaseAuthUserCollisionException) => {
         window.alert("User Already exist!");
         // ..
       })
       .catch((error) => {
         window.alert("Something went wrong, please try again!");
         // ..
       });
    } catch (error) {
      alert(error);
    }
  }, [history]);
  return (
    <div className="main_top">
        <Navbar/>

{/* <!-- Signup form --> */}
<div className="container-fluid padding main" id="main">
    <div className="row padding">
		<div className="col-md-6 left">
            <div className="left_div">
                <h2>Welcome to Agistic!</h2>
                <h4 style={{color: 'white'}}>Trace your Product</h4>
            </div>
		</div>
        <div className="col-md-6 right">
                <form onSubmit={handleSignUp} >
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
                  <div className="form-group">
                    <label for="passwordRepeat">Repeat Password</label>
                    <input className="form-control" type="password" name="passwordRepeat" id="passwordRepeat" placeholder="********" required />
                  </div>
                  <div className="form-group">
                    <label for="user" style={{fontWeight: 'bold'}} >Choose type of User</label>
                  <input type="radio" id="user" name="types" value="user" />
          <label for="user" style={{color: 'black' ,paddingLeft:'5px' ,paddingRight:'5px' }} >User</label>
           <input type="radio" id="manufacturer" name="types" value="manufacturer" />
          <label for="manufacturer" style={{color: 'black' ,paddingLeft:'5px' ,paddingRight:'5px' }}>Manufacturer</label>
          <input type="radio" id="warehouse" name="types" value="warehouse" />
          <label for="warehouse" style={{color:'black' ,paddingLeft:'5px' ,paddingRight:'5px' }}>Warehouse</label>
        </div>
                  <div className="row">
                      <div className="col-12" style={{textAlign: 'center'}}>
                        <button type="button" className="btn btn--form" type="submit">Signup</button>
                      </div>
                      <div className="col-12" style={{textAlign: 'center'}}>
                        <p className="signup__link">Already have an account? <a href="/login" style={{color: 'blue',textDecoration: 'none'}}>Login Here</a></p>
                      </div>
                  </div>
                </form>  
		</div>
	</div>
</div>
    </div>
  );
}

export default Signup;
