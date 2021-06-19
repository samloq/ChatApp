const passport = require('passport');
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const User = require('../models/user.model');

// router.get('/users/current', [auth], (req,res) => {
//     const id = req.id;
//     return User.findById(id)
//         .then((user) => {
//             if(!user){
//                 return res.sendStatus(400);
//             }

//             return res.json({ user: user.toAuthJSON()});
//         });
// });







//REGISTER USER

router.post('/register', (req,res) => {
    const { body: { user }} = req;
    user.userId = '_' + Math.random().toString(36).substr(2, 9);

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            }
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        });
    }

    if(!user.firstname) {
        return res.status(422).json({
            errors: {
                firstname: 'is required'
            }
        });
    }

    if(!user.surname) {
        return res.status(422).json({
            errors: {
                surname: 'is required'
            }
        });
    }

    if(!user.username) {
        return res.status(422).json({
            errors: {
                username: 'is required'
            }
        });
    }

    if(!user.userId) {
        return res.status(422).json({
            errors: {
                userId: 'is required'
            }
        });
    }

    User.findOne({
        email: user.email
    })
    .then(u =>{
        if(!u) {
            const newUser = new User(user);
            newUser.setPassword(user.password);
        
            return newUser.save()
                   .then(() => res.json({ user: newUser.toAuthJSON() }));
        } else {
            res.status(400).json({ error: 'User already exists'});
        }   
    })
    .catch(err => {
        res.send('error: ' + err);
    });

   
});

//LOGIN USER

router.post('/login', (req,res,next) => {
    const { body: { user }} = req;
    console.log(user);
    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required'
            },
        })
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        })
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return res.status(400).info;
    })(req,res,next);
});


//get friends
// router.get("/users", async (req, res) => {
//     console.log(1);
//     console.log(req.query.userId);
//     try {
//       const user = await User.findById(req.query.userId);
//       const friends = await Promise.all(
//         user.followings.map((friendId) => {
//           return User.findById(friendId);
//         })
//       );
//       let friendList = [];
//       friends.map((friend) => {
//         const { _id, username } = friend;
//         friendList.push({ _id, username });
//       });
//       res.status(200).json(friendList)
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
//GET ALL USERS

router.get('/users', (req,res) => {
    
    let users = [];

    User.find({}, (err, docs) => {
        if(err) {
            res.status(401).json({});
        } else {
            for(let user of docs) {
                users.push({ id: user._id, username: user.username, email: user.email })
            }
            res.json({ users });
        }
    });
});






//GET USER

router.get('/users/:id', [auth], (req,res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err) {
            res.status(401).json({});
        } else {
            res.json({user});
        }
    });
});

router.get('/users/:name', (req,res) => {
    let userName = req.params.name;
    User.findOne({username: userName}, function(err, obj) {
        if(err) {
            res.status(401).json({});
        } else {
            res.json({user});
        }
    })
});

//UPDATE USER

router.patch('/users/:id',[auth],(req,res) => {
    let id = req.params.id;
    let userData = req.body.user;

    User.findById(id, (err, user) => {
        if(err) {
            res.status(401).json({});
        }
        for (let i in userData) {
            user[i] = userData[i];
        }
        user.save(function (err) {
            if (err) {
                res.status(500).json({"error": err});
            } else {
                res.status(204);
            }
        });
    })
});

//REMOVE USER

router.delete('/users/:id', [auth], (req,res) => {
    let id = req.params.id;

    User.findByIdAndRemove(id, (err) => {
        if(err) {
            res.status(500).json({"error": err});
        } else {
            res.status(201).json({status:"success", message: "User deleted successfully"});
        }
    });
});






module.exports = router;