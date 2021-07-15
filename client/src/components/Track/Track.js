import React, { Component , useState} from 'react';
import app from "../firebase/firebase.js";
import Navbar from '../Navbar/Navbar';
import Tracks from './track_main.js';
import SupplyChain from '../../abis/SupplyChain.json';
import Web3 from 'web3';

import './Track.css';

class track_class extends Component {

     componentDidMount() {
         app.auth().onAuthStateChanged(user => {
            if (user) {
             var id= user.uid;
             var ref = app.database().ref();
             app.database().ref('/users/' + id).once('value').then((snapshot) => {
                // console.log(snapshot.val().type);
                this.setState({user: snapshot.val().type});
           });
            } else {
                this.setState({user: 'nouser'});
            }
          });
        
      }


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //console.log(web3)

    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    //Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SupplyChain.networks[networkId]
    //IF got connection, get data from contracts
    if(networkData){
      //Assign contract
      const supplychain = new web3.eth.Contract(SupplyChain.abi, networkData.address)
      this.setState({supplychain})
     // const sayhello = await supplychain.methods.sayHello().call()
      //window.alert(sayhello)
      //Get files amount

      //Load files&sort by the newest

    //Else
      //alert Error
    }else{
      window.alert("SupplyC Chain not deployed to the detected network")
    }
  }

  // Get file from user
  captureFile = event => {
  }


  //Tester Function
  sayhello = description => {
     if(this.state.type === ''){
       this.setState({type: 'none'})
     }
    console.log('hi')


  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account :'',
      supplychain: null,
      city: '',
      country: '',
      latitude: '',
      longitude:'',
      location_arr:[],
      user :'nouser',
      searchProductResult: '',
      searchProductShow: false,
      addNewItemResult: '',
      addNewItemShow:false,
      scanLocationShow:false
    }

    //Bind functions
  }

  //another tester function
  momo = description => {
    console.log(description)
  }

  newItem = async(description) => {

    var date_today = new Date().toLocaleDateString()
    this.state.supplychain.methods.newItem(description, date_today).send({from: this.state.account})
    const productId = await this.state.supplychain.methods.getProductId().call()
    console.log("Your product ID is: " + await productId);
    this.setState({addNewItemResult: await productId, addNewItemShow: true});
    
  }

  addState = description => {
    // automatically detecting location of warehouse.
    var jsonvariable, output_string;
    fetch(
      "https://geolocation-db.com/json/0fconsole.log(data)761a30-fe14-11e9-b59f-e53803842572"
    )
      .then(response => response.json())
      .then(function(myJson) {
        console.log(myJson.city);
        jsonvariable = myJson
        output_string = jsonvariable.city +' '+jsonvariable.country_name+ 'the end'
        console.log(output_string)

      })
      const self=this;
      setTimeout(function(){
        console.log(output_string)
       console.log(self.state.hello)
       self.state.supplychain.methods.addState(description,output_string ).send({from: self.state.account})
      }, 2000);
  }

  searchProduct = description => {
    // var ans = await this.state.supplychain.methods.searchProduct(description).call()
    // console.log(ans)
    const data = async ()  => {
      const sayhello = await this.state.supplychain.methods.sayHello().call()
      console.log(sayhello)
      const got = await this.state.supplychain.methods.searchProduct(description).call();
      
      console.log(await got)
      this.setState({searchProductResult: await got, searchProductShow: true});
    }
    data()
  }

  render() {
      if(this.state.user=='nouser') return ( <div>Loading...</div> );
    return (
        <div className="main_track"> 
        <Navbar/>
        <Tracks
           sayHello={this.sayHello}
           newItem={this.newItem}
           addState={this.addState}
           searchProduct={this.searchProduct}
           searchProductResult = {this.state.searchProductResult}
           searchProductShow = {this.state.searchProductShow}
           addNewItemShow = {this.state.addNewItemShow}
           addNewItemResult = {this.state.addNewItemResult}
           scanLocationShow = {this.state.scanLocationShow}
           city = {this.state.city}
           lat = {this.state.latitude}
           long = {this.state.longitude}
        />
      </div>
    );
  }
}

export default track_class;