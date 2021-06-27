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
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState({});
    //user
    var socket = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("http://localhost:5000");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        });
    },[]);

    useEffect(() => {
        socket.current.emit('set-user-data', (user.username));
        socket.current.on('onlineStack', data => {
            setOnlineFriends(data);
        });
    },[onlineUsers]);
    

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage])
    },[arrivalMessage, currentChat]);


    useEffect(() => {
        socket.current.emit("addUser", user._id);

        socket.current.on("getUsers", users=>{
            setOnlineUsers(user.followings.filter(f=> users.some(u => u.userId === f)));
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

    const handleSubmit = async (e, file, fileName, setLoaded) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId:currentChat._id,
        };

        const receiverId = currentChat.members.find(member => member !== user._id);
        try{
            const res = await axios.post(`http://localhost:5000/api/v1/messages/upload?sender=${message.sender}&text=${message.text}&conversationId=${message.conversationId}`,formData);
            console.log(res.data);
            setMessages([...messages, res.data]);

            socket.current.emit("sendMessage", {
                senderId: user._id,
                receiverId,
                text: newMessage,
                filePath: res.data.filePath
            });


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
                onlineUsers={onlineUsers}
            />
        </React.Fragment>
    );
}

export default ChatPage;


