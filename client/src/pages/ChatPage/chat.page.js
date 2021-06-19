import React, {useState, useEffect, useRef } from 'react';
import Chat from '../../components/Chat/Chat';
import axios from 'axios';
import io from 'socket.io-client';


const ChatPage = ({user}) => {

    const [ conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    //user
    var socket = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("http://localhost:5000/");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        });
    },[]);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage])
    },[arrivalMessage, currentChat]);


    useEffect(() => {
        socket.current.emit("addUser", user._id);

        socket.current.on("getUsers", users=>{
            console.log(users)
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async ( ) => {
            try{
                const res = await axios.get('http://localhost:5000/api/v1/conversations/'+user._id);
                setConversations(res.data);
            }catch(err)
            {
                console.log(err);
            }
        }
        getConversations();
    }, [user._id]);

    useEffect(()=>{
        const getMessages = async () => {
            try{
                const res = await axios.get('http://localhost:5000/api/v1/messages/'+currentChat?._id);
                setMessages(res.data);
            }catch(err)
            {
                console.log(err);
            }
        }
        getMessages();
    },[currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId:currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        });

        try{
            const res = await axios.post("http://localhost:5000/api/v1/messages", message);
            console.log(res);
            setMessages([...messages, res.data]);
            setNewMessage("");
        }catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[messages]);
    return(
        <React.Fragment>
            <Chat
                conversations={conversations}
                user={user}
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
                messages={messages}
                scrollRef={scrollRef}
                setNewMessage={setNewMessage}
                newMessage={newMessage}
                handleSubmit={handleSubmit}
            />
        </React.Fragment>
    );
}

export default ChatPage;


