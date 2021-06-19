import lib from 'mongoose/lib';
import React from 'react';
import ReactEmoji from 'react-emoji';
import {format} from 'timeago.js';

import './Message.css';

// const Message = ({ message:{user, text}, name }) => {
//     let isSentByCurrentUser = false;
    
//     const trimmedName = name.trim().toLowerCase();

//     if(user === trimmedName) {
//         isSentByCurrentUser = true;
//     }

//     if(isSentByCurrentUser && text)
//     {
//      return(
//             <li className="msg-left">
//                 <div className="msg-left-sub">
//                     <img src="https://nicesnippets.com/demo/man03.png" alt="user_ico"/>
//                     <div className="msg-desc">
//                         {ReactEmoji.emojify(text)}
//                     </div>
//                     <small>05:25 am</small>
//                 </div>
// 			</li>
//         )
// 	}

//     if(!isSentByCurrentUser && text)
//     {
//      return (
//             <li className="msg-right">
//                 <div className="msg-left-sub">
//                     <img src="https://nicesnippets.com/demo/man04.png" alt="user_ico"/>
//                     <div className="msg-desc">
//                         {ReactEmoji.emojify(text)}
//                     </div>
//                     <small>05:25 am</small>
//                 </div>
// 			</li>
//         )
// 	} else {
//         return (
//             <li>
//             </li>
// 		)
// 	}
// }

const Message = ({ message, own, user}) => {

if(own == true)
 {
     return (<li className="msg-left">
     <div className="msg-left-sub">
         <img src="https://nicesnippets.com/demo/man03.png" alt="user_ico"/>
         <p>{user.username}</p>
         <div className="msg-desc">
             {ReactEmoji.emojify(message.text)}
         </div>
         <small>{format(message.createdAt)}</small>
     </div>
 </li>);
 }
 else
 {
    return(
        <>
            <li className="msg-right">
                <div className="msg-left-sub">
                    <img src="https://nicesnippets.com/demo/man04.png" alt="user_ico"/>
                    <div className="msg-desc">
                        {ReactEmoji.emojify(message.text)}
                    </div>
                    <small>{format(message.createdAt)}</small>
                </div>
            </li>
        </>)
 }
}

export default Message;


