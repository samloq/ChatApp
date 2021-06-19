import React from 'react';
import NavBar from '../NavBar/NavBar';
import Head from './Head/Head';
import LeftSection from './LeftSection/LeftSection';
import RightSection from './RightSection/RightSection';

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
    handleSubmit
}) => {
    return(
        <React.Fragment>
            <NavBar/>
            <Head/>
            <div className="body-section">
                <LeftSection conversations={conversations} user={user} setCurrentChat={setCurrentChat}/>
                <RightSection 
                    currentChat={currentChat} 
                    messages={messages} 
                    user={user} 
                    scrollRef={scrollRef}
                    setNewMessage={setNewMessage}
                    newMessage={newMessage}
                    handleSubmit={handleSubmit}
                />
            </div>
        </React.Fragment>
    )
}

export default Chat;

