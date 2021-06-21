import lib from 'mongoose/lib';
import React from 'react';
import ReactEmoji from 'react-emoji';
import {format} from 'timeago.js';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './Message.css';

const Message = ({ message, own, user, conversations}) => {

const [friend, setFriend] = useState("");
useEffect(()=>{
    
        let friendId;
        const map = conversations.map((e) => friendId = e.members.find(m => m!== user._id));
        const getUser = async() => {
            try{
            const res = await axios("http://localhost:5000/api/v1/friends/users?userId=" + friendId);
            setFriend(res.data);
            }catch(err)
            {
                console.log(err);
            }
        }
        getUser();
    },[user, conversations]);

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
                    <p>{friend.username}</p>
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


