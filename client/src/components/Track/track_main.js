import React, { Component } from 'react';
import { convertBytes } from '../helpers';
import moment from 'moment'
import app from "../firebase/firebase.js";
import ReactHtmlParser from 'react-html-parser';

import './Track.css';

class track_main extends Component {

     componentDidMount() {
         app.auth().onAuthStateChanged(user => {
            if (user) {
             var id= user.uid;
             var ref = app.database().ref();
             app.database().ref('/users/' + id).once('value').then((snapshot) => {
                console.log(snapshot.val().type);
                this.setState({user: snapshot.val().type});
           });
            } else {
                this.setState({user: 'nouser'});
            }
          });
        
      }

  constructor(props) {
    super(props)
    this.state = {
      user :'nouser',
      account :'',
      supplychain: null
    }

  }

  render() {
    return (
        <div> 
  
  <div className="container-fluid">
      <div className="row top justify-content-center align-self-center" >
          <div>
              <h2 style={{color: 'black'}} >Search Product</h2>
              <p>Enter Code and submit to get the tracking details.</p>
              <div>
                  <div>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.searchPdtDescription.value
                    this.props.searchProduct(description)
                  }} >
                      {/* <input type="text" name="id" id="id" style={{outline:'none'}} placeholder="13243656576" required />  */}
                      <input
                            id="searchPdtDescription"
                            type="text"
                            style={{outline:'none'}}
                            ref={(input) => { this.searchPdtDescription = input }}
                            className="form-control text-monospace"
                            placeholder="Product ID"
                            required />
                      <button type="submit" className="submitbtn" style={{outline:'none'}} >Submit</button>
                      {this.props.searchProductShow ?  <div className="justify-" > 
                       <br></br>
                     {ReactHtmlParser(this.props.searchProductResult)} <br></br>  
                     {/* <Map city={this.props.city} lat={this.props.lat} long={this.props.long} />   */}
                     </div> : null }
                     </form>
                  </div>
              </div>
          </div>
      </div>
      { this.state.user!='user'? 
      <div className="row top justify-content-center align-self-center add" id="add" >
          <div>
              <h2 style={{color: 'black'}}>Add New Item</h2>
              <p>Enter Product Id and location.</p>
              <div>
                  <div>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.nameDescription.value
                    this.props.newItem(description)
                  }} >
                      {/* <input type="text" name="add_id" id="add_id" style={{outline:'none'}} placeholder="13243656576" required />
                      <input type="text" name="add_location" id="add_location" style={{outline:'none'}} placeholder="New Delhi" required />  */}
                      <input
                            id="nameDescription"
                            type="text"
                            ref={(input) => { this.nameDescription = input }}
                            className="form-control text-monospace"
                            placeholder="name of product..."
                            required /> 
                      <button type="submit" className="submitbtn" style={{outline:'none'}} >Add</button>
                      {this.props.addNewItemShow ?  <div className="justify-" > 
                       <br></br>
                     Your product ID IS: {this.props.addNewItemResult} <br></br>  
                     {/* <Map city={this.props.city} lat={this.props.lat} long={this.props.long} />   */}
                     </div> : null }
                   </form>
                  </div>
              </div>
          </div>
      </div> : console.log(this.state.user) }
      { this.state.user =='manufacturer' ?
      <div className="row top justify-content-center align-self-center scan" id="scan" >
          <div>
              <h2 style={{color: 'black'}}>Scan Shipment</h2>
              <p>Enter Prodcut Id and location.</p>
              <div>
                  <div>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.addStateDescription.value
                    this.props.addState(description)
                  }} >
                      {/* <input type="text" name="scan_id" id="scan_id" style={{outline:'none'}} placeholder="13243656576" required />
                      <input type="text" name="scan_location" id="scan_location" style={{outline:'none'}} placeholder="New Delhi" required />  */}
                      <input
                            id="addStateDescription"
                            type="text"
                            ref={(input) => { this.addStateDescription = input }}
                            className="form-control text-monospace"
                            placeholder="Product ID"
                            required /> 
                      <button type="submit" className="submitbtn" style={{outline:'none'}} >Scan</button>
                  </form>
                  </div>
              </div>
          </div>
      </div> :null }
      </div> 
      </div>
    );
  }
}

export default track_main;