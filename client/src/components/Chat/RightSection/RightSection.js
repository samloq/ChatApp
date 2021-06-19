import React from 'react';
import './RightSection.css';
import Messages from './Messages/Messages';
import Input from './Input/Input';

const RightSection = ({
	currentChat,
	messages,
	user,
	scrollRef,
	setNewMessage,
	newMessage,
	handleSubmit
}) => {
    return (
        <React.Fragment>
        <div className="right-section">
			{messages.map((m, k) => 
				 <div ref={scrollRef} key={k}>
					<Messages message={m} own={m.sender === user._id} user={user} key={k}/> 
				 </div>
            )}
			<div className="right-section-bottom">
				<Input
					setNewMessage={setNewMessage}
					value={newMessage}
					handleSubmit={handleSubmit}
				/>
			</div>
		</div>

        </React.Fragment>
    )
}

export default RightSection
