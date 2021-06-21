import React from 'react';
import NavBar from '../NavBar/NavBar';
import Head from './Head/Head';
import LeftSection from './LeftSection/LeftSection';
import RightSection from './RightSection/RightSection';
import OnlineSection from './OnlineSection/OnlineSection';


import './Chat.css';



const Chat = ({
    conversations,
    user,
    setCurrentChat,
    currentChat,
    messages,
    scrollRef,
    setNewMessage,
    newMessage,
    handleSubmit,
    onlineUsers
}) => {
    return(
        <React.Fragment>
            <NavBar/>
            <Head user={user}/>
            <div className="body-section">
                <LeftSection 
                    conversations={conversations} 
                    user={user} 
                    setCurrentChat={setCurrentChat} 
                    onlineUsers={onlineUsers} 
                    currentId={user._id}
                />
                <RightSection 
                    currentChat={currentChat} 
                    messages={messages} 
                    user={user} 
                    scrollRef={scrollRef}
                    setNewMessage={setNewMessage}
                    newMessage={newMessage}
                    handleSubmit={handleSubmit}
                    conversations={conversations}
                />
                <OnlineSection
                    onlineUsers={onlineUsers}
                    currentId={user._id}
                    setCurrentChat={setCurrentChat}
                />
                
            </div>
        </React.Fragment>
    )
}

export default Chat;

