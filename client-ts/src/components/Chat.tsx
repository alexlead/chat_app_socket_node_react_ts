import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import Message from './Message';


interface ChatInterface {
  socket: Socket,
  username: string,
  room: string,
  setEntered: (entered:boolean)=> void,

}


interface MessagesList {
  room: string,
  author: string,
  message: string,
  time: number
}


const Chat = ({socket, username, room, setEntered }:ChatInterface) => {

  const connection = socket.connect();
  connection.emit("join_room", room);

  const [messageText,setMessageText] = useState<string>("");
  const [messagesList, setMessagesList]  = useState<MessagesList[]>([]);


  const sendMessage = async() => {

    if( messageText.length ) {

      const sendingMessage: MessagesList = {
        room,
        author: username,
        message: messageText,
        time: Date.now()
      };
      
      await connection.emit("send_message", sendingMessage);
      
      setMessagesList([...messagesList, sendingMessage]);
      
      console.log(messagesList);
      setMessageText("");
    }

  };


  useEffect(() => {
    connection.on("receive_message", (data:MessagesList)=> {
     setMessagesList([...messagesList, data]);
     console.log(messagesList);
    })
 }, [connection])

  
  

  return (
    <div className="layout">
      <div className="chat">
        <div className="chat__header">
          <h3>Room: {room}</h3>
          <h4>User: {username}</h4>
        </div>
        <div className="chat__body">
        <div className="messages">

            {

              messagesList.sort((a,b)=>( a.time - b.time )).map((message, index)=>(
               <Message key={index} username={username} message={message} /> 
              ))
            }

        </div>

        </div>
        <div className="chat__footer">
          <div className="chat__footer__message">
          <textarea placeholder='Message...' onChange={(e)=>setMessageText(e.target.value)} value={messageText}></textarea>
          <button onClick={sendMessage}>&#9658;</button>
          </div>
          <div className="chat__footer__logout">
          <button onClick={()=>setEntered(false)}>Logout</button>
          </div>
          
        </div>

      </div>

    </div>
  )
}

export default Chat