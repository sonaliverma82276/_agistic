import React, { useState, useEffect } from "react";
import app from "../firebase/firebase.js";
function onAuthStateChange(callback) {
	return app.auth().onAuthStateChanged(user => {
	  if (user) {
		callback(user); 
	  } else {
		callback(null); 
	  }
	});
}

const Navbar = () => {
	const [user,setUser]=useState(null);
	
	useEffect(() => {
		const unsubscribe = onAuthStateChange(setUser);
		return () => {
			unsubscribe();
		};
	  }, []);

	 console.log(user);

  return (
    <div className="navbar_main">
      <nav className="navbar navbar-expand-md navbar-light fixed-top" style={{backgroundColor:'#467cdb'}} >
	<div className="container-fluid">
	<a className="navbar-brand"  style={{color:'white'}} href="#">Agistic</a>	
	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
		<span className="navbar-toggler-icon">
		</span>
	</button>
	<div className="collapse navbar-collapse" id="navbarResponsive">
		<ul className="navbar-nav ml-auto">
			<li className="nav-item active"> <a className="ab" href="/#about">About</a></li>
			 <li className="nav-item "><a className="ab"href="/#gettingstarted">Getting Started</a></li>
			 {
				 user ? 
				 <div> 
					<li className="nav-item" style={{cursor:"pointer"}} ><a className="ab" href="/join">Chat</a></li>
				 </div> : 
				 <div>
                    <li className="nav-item "><a className="ab" href="/login">Login/Signup</a></li> 
				  </div>
			 }
			 {
				 user ? <li className="nav-item" style={{cursor:"pointer"}} ><a className="ab" onClick={() => app.auth().signOut()}>Logout</a></li>
				 : 
				 null
			 }
			 <li className="nav-item "><a className="ab" href="/#contact">Contact</a></li>
	   </ul>
	</div>
	</div> 
</nav>
    </div>
  );
}

export default Navbar;
