import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import app from "../firebase/firebase.js";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'http://localhost:5000/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => { console.log("1"); console.log(messages);
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]); 
       console.log("this"); //console.log(messages); 
      console.log(message);
      var temp=[];
      app.database().ref('/rooms/' + room ).once('value').then((snapshot) => {
        if(snapshot.val()) {
          snapshot.val().messages.map((cur, i) => {    
            if(cur.user.toLowerCase()!=='admin')              
             temp.push(cur);
            })
         }
      }).then(() => {
        if( message && message.user.toLowerCase()!=='admin')
        temp.push(message); 
        console.log("temp");
        console.log(temp);
        console.log(message);
        app.database().ref('rooms/' + room ).set({
          messages:temp,
      }, (error) => {
          if (error) {
            console.log("failed");
          } 
          else console.log("not sure");
      });
      }); 
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users); 
      // console.log("2"); console.log(messages);
    });
}, []);

useEffect(() => {
  const { name, room } = queryString.parse(location.search);
  app.database().ref('/rooms/' + room ).once('value').then((snapshot) => {
       if(snapshot.val()) {
          snapshot.val().messages.map((cur, i) => {     
              console.log(cur);    
              if(cur.user!=='admin')              
            setMessages(messages => [ ...messages, cur ]);
         })
        }
     });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      var cur=message;
      var temp=[];
      app.database().ref('/rooms/' + room ).once('value').then((snapshot) => {
        if(snapshot.val()) {
          snapshot.val().messages.map((cur, i) => {    
            if(cur.user.toLowerCase()!=='admin')              
             temp.push(cur);
            })
         }
      }).then(() => {
              if(message && message.user.toLowerCase()!=='admin')
              temp.push(message); 
              console.log("temp");
              console.log(temp);
              console.log(message);
              app.database().ref('rooms/' + room ).set({
                messages:temp,
            }, (error) => {
                if (error) {
                  console.log("failed");
                } 
                else console.log("not sure");
            });
     }); 
      socket.emit('sendMessage', message, () => setMessage('')); console.log("3"); console.log(messages);
      var temp=[];
      messages.map((cur, i) => {    
        if(cur.user.toLowerCase()!=='admin')              
         temp.push(cur);
        }).then(()=>{ console.log("second"); console.log(temp);
              app.database().ref('rooms/' + room ).set({
                messages:temp,
            }, (error) => {
                if (error) {
                  console.log("failed");
                } 
                else console.log("done");
            });
       }); 
    }
  }

  return (
    <div className="outerContainer">
      <div className="container_chat">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
