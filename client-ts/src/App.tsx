import React, { useState } from 'react';
import { io, Socket } from "socket.io-client";
import Enterence from './components/Enterence';
import Chat from './components/Chat';


const socket: Socket = io("http://localhost:3001");


function App() {

  const [username, setUsername ] = useState<string>("");
  const [room, setRoom ] = useState<string>("");
  const [entered, setEntered] = useState<boolean>(false);

  const joinRoom = ():void => {
    if(username.length > 2 && room.length > 2) {
      setEntered(true);
    }
  }

  return (
    <div className="App">
      { entered ?
       ( 
       <Chat socket={socket} username={username} room={room} setEntered={setEntered}/>
       ) : ( 
        <Enterence username={username} setUsername={setUsername} room={room} setRoom={ setRoom } joinRoom={joinRoom} />
        )
      }
    </div>
  );
}

export default App;
