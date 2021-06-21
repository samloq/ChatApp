import React from 'react';
import OnlineUsers from './onlineusers/OnlineUsers';
import './online.css';

const OnlineSection= ({
    onlineUsers,
    currentId,
    setCurrentChat
}) => {
    return <OnlineUsers
        onlineUsers={onlineUsers}
        currentId={currentId}
        setCurrentChat={setCurrentChat}
    />
}

export default OnlineSection;