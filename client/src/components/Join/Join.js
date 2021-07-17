import React, { useState , useEffect} from 'react';
import { Link } from "react-router-dom";

import app from "../firebase/firebase.js";

import './Join.css';

function onAuthStateChange(callback) {
	return app.auth().onAuthStateChanged(user => {
	  if (user) { 
      var id= user.uid;
       var ref = app.database().ref();
       app.database().ref('/users/' + id).once('value').then((snapshot) => {
          console.log(snapshot.val().username);
          callback(snapshot.val().username);
     });
	  } else {
		callback('');
	  }
	});
}

function getRooms(callback) {
  return app.database().ref('/').once('value').then((snapshot) => {
     callback(Object.keys(snapshot.val().rooms));
     console.log(Object.keys(snapshot.val().rooms));
});
}

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [existingRooms,setExistingRooms]= useState([]);

  useEffect(() => {
		const unsubscribe = onAuthStateChange(setName);
    getRooms(setExistingRooms);
		return () => {
		  unsubscribe();
		};
	  }, []);

    console.log("existingRooms");
    console.log(name);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        {/* <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div> */}
        <div>
          <input placeholder="Create new Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <div style={{marginTop:'30px'}} >
         <input placeholder="Existing Rooms" type="text" list="data" className="joinInput mt-20" onChange={(event) => setRoom(event.target.value)}  />
          <datalist id="data">
             { 
             existingRooms.map((item, key) => 
              <option key={key} value={item}/>
            )
          } 
          </datalist>
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
