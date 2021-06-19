import React, { useState, useEffect } from "react";

import Navbar from '../Navbar/Navbar';

const home = () => {
  return (
    <div className="main" style={{marginTop:'65px'}} >
      <Navbar/>

<section id="hero" className="d-flex align-items-center" >
    <div className="home_container" style={{paddingLeft:'40px'}}>
      <h2>Tracking made Easy</h2>
	  <a href="/track" style={{textDecoration:"none"}}  >
		<button className="trackbtn" style={{outline:"none"}}>Track</button> </a>
    </div>
	<img src="img/logo.png" />
  </section>

{/* <!--About--> */}
<div className="container-fluid d-flex about" style={{backgroundColor:'white'}} id="about">
	<div className="row text-center justify-content-center align-self-center">
		<div className="col-12 ">
			<h2 className="title">ABOUT</h2><div className="line"></div><br/>
   
  <p className="pa">We have built a web application that helps improve the way demand-supply chain works in a two-fold way. Firstly, we have an ethereum based blockchain to store all the data about where an item was manufactured/produced, where was the warehouse, etc. An account logged in a manufacturer can add a product, a warehouse account can change state and the end user can trace exactly where his or her products come from and how much time it took to reach there. This is useful because blockchain is immutable, so there is no chance of tampering with food or medicine products. Also tracing makes it easy to reach out and recall defected pieces. 

Secondly, we have a chat option with separate rooms where manufacturers can communicate with farmers or resturants/end-users who use their product. They can make an order through the chat room and also check-up on the product shipment status.
</p>

		</div>
	</div>
</div>

{/* <!--- Getting started Section --> */}
<div className="container-fluid d-flex gettingstarted" id="gettingstarted">
	<div className="row text-center justify-content-center align-self-center">
		<div className="col-12 ">
			<h2 className="title">Getting Started</h2><div className="line"></div><br/>
   
			<div className="container-fluid padding" >
				<div className="row text-center padding"  style={{fontSize:'1rem'}}>
					<div className="col-xs-12 col-sm-6 col-md-4">
						<img src="img/code.svg" width="40%" alt="IMAGE" className="img-fluid"/>
						<h3>Enter the Code</h3>
						<p>Check the code on product and enter the respective code.</p>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-4">
						<img src="img/receive.png" width="40%" alt="IMAGE" className="img-fluid"/>
						<h3>Receive your assessment</h3>
						<p>lWithin 10 seconds, you'l receive the tracking details.</p>
					</div>
					<div className=" col-sm-12 col-md-4">
						<img src="img/check.png" width="50%" alt="IMAGE" className="img-fluid"/>
						<h3>Save and Check the details</h3>
						<p>Securely save details and keep track of your products.</p>
					</div>
				</div>
				</div>

		</div>
	</div>
</div>


{/* <!--Contact INfo--> */}
<footer>
<div className="container-fluid padding" id="contact">
	<div className="row padding text-center">
		<div className="col-12 social padding">
			<a href="/"><i className="fab fa-facebook"></i></a>
			<a href="/"><i className="fab fa-instagram"></i></a>
            <a href="/"> <i className="fab fa-linkedin"></i></a>
		</div>
	</div>
</div>
</footer>
    </div>
  );
}

export default home;
