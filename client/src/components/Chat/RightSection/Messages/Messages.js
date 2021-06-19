import React from 'react'
import './Messages.css';
import Message from './../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';


const Messages = ({message, own, user, friend}) => {
    return(<div className="message">
        <ul className="messages">
                <Message message={message} own={own} user={user} friend={friend}/>
        </ul>
    </div>)
}

export default Messages
