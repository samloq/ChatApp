const events = require('events');
const eventEmitter = new events.EventEmitter();
const User = require('../models/user.model.js');

module.exports = function(socket) {
const userStack = {};
const userSocket = {};
let sendUserStack;



let users = [];


const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
    users.push({userId, socketId});
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}




socket.on("connection", (socket) => {
    console.log('user connected.');
    
    socket.on("addUser", userId=>{
        addUser(userId, socket.id);
        socket.emit("getUsers", users);
    });
    
    socket.on('set-user-data', (username, id) => {
        console.log(`${username} logged In`);

        socket.username = username;
        userSocket[socket.username] = socket.id;

        socket.broadcast.emit('broadcast', {
            description: username + " Logged In"
        });


        eventEmitter.emit('get-all-users');
        

        sendUserStack = function() {
            for(i in userSocket) {
                for(j in userStack) {
                    if(j==i) {
                        userStack[j] = "Online";
                    }
                }
            }
            socket.emit("onlineStack", userStack);
        }
        
    });




    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        

        socket.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
        })
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
        socket.emit("getUsers", users);
    });

    
    eventEmitter.on('get-all-users', () => {
        User
            .find({})
            .select("username")
            .exec((err, result) => {
                if(err) {
                    console.log("Err: " + err);
                } else {
                    for(let i=0; i < result.length; i++) {
                        userStack[result[i].username] = "Offline";
                    }
                    sendUserStack();
                }
            });
    });





})
}












