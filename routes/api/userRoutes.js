const { User, Thought } = require('../../models');

const router = require('express').Router();

// get all users
router.get(`/`, (req, res) => {
    User.find()
        .then ((user) => {
            res.json(user)
        })
        .catch((err)=> {
        console.log(err);
        res.status(500).json({msg: err})
        })
});

// get single user by Id
router.get(`/:userId`, (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then((user)=> {
            if (!user) {
                res.status(404).json({msg: `User not found!`})
            } else {
                res.json(user)
            }
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).json({msg: err})
            })
    
});

// post a new user
router.post(`/`,(req, res) => {
    User.create(req.body)
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg: err})
    })
});

// update/put a user by Id
router.put(`/:userId`, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        { $set: 
           { username: req.body.username,
            email: req.body.email}
        },
        { runValidators: true, new: true }
    )
        .then((updatedUser)=>{
            if (!updatedUser) {
                res.status(404).json({msg: "User not found!"})
            }
            // for (let i=0; i<updatedUser.thoughts.length; i++){
            //     Thought.findOneAndUpdate(
            //         {_id: updatedUser.thoughts[i]},
            //         {$set: {username: updatedUser.username}},
            //         { runValidators: true, new: true }
            //         )
            //     console.log(updatedUser.thoughts[i]._id)
            // }
            res.json(updatedUser)
            
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({msg: err})
        })

});

// delete a user by ID (bonus remove associated thoughts when deleted)
router.delete(`/:userId`, (req, res) => {
    User.findOneAndDelete({_id: req.params.userId})
    .then((delUser)=>{
        if (!delUser) {
            res.status(404).json({msg: "User does not exist!"})
        }
        // for (let i=0; i<delUser.thoughts.length; i++){
        //     Thought.findOneAnddelete({_id: delUser.thoughts[i]})
        //     console.log(delUser.thoughts[i])
        // }
        res.json(delUser)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg: err})
    })
});

// friends routes?

module.exports = router;