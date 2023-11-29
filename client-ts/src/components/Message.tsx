import React from 'react'

interface MessageItem {

    username: string,
    message:{
      author: string,
      message: string,
      time: number
    }


}

const Message = ({username, message }: MessageItem) => {

const messageClass = ():string=>{

  return (username===message.author)? ' owner':'';

}

  return (
    <div className={'message' + messageClass() }>
      <div className="message__block">
      <div className="triangle"></div>
      <div className="message__block__header">{message.author}</div>
      <div className="message__block__body">{message.message}</div>
      <div className="message__block__footer">{(new Date(message.time )).getHours() + ":"+ (new Date(message.time )).getMinutes() + ":" + (new Date(message.time )).getSeconds()}</div>
    </div>
  </div>
  )
}

export default Message