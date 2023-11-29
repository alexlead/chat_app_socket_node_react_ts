import React from 'react'

interface Enterance {
    username: string,
    setUsername: (username:string)=> void,
    room: string,
    setRoom: (username:string)=> void,
    joinRoom: ()=> void,

}


const Enterence = ({username, setUsername, room, setRoom, joinRoom }: Enterance) => {

  return (
    <div className="layout">
        <div className="enterance">
        <div className="enterance__header"> <h3>Enterance</h3></div>
        <div className="enterance__body">
        <input type="text" placeholder='Enter your name' onChange={(e)=>setUsername(e.target.value)} value={username} />
        <input type="text" placeholder='Enter room id' onChange={(e)=>setRoom(e.target.value)} value={room}/>
        <button onClick={joinRoom}>Enter Room</button>
        </div>
        </div>

    </div>
  )
}

export default Enterence