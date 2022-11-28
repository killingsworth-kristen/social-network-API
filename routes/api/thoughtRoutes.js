const { Thought, User } = require(`../../models`)

const router = require('express').Router();

// get all thoughts
router.get(`/`, (req, res) => {
    Thought.find()
        .then ((thought) => {
            res.json(thought)
        })
        .catch((err)=> {
        console.log(err);
        res.status(500).json({msg: err})
        })
});

// get a single thought by its Id
router.get(`/:thoughtId`, (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
        .then((thought)=> {
            if (!thought) {
                res.status(404).json({msg: `thought not found!`})
            } else {
                res.json(thought)
            }
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).json({msg: err})
            })
    
});

// post a new thought
router.post(`/`,(req, res) => {
    const userId = req.body.userId
    Thought.create(req.body)
    .then((thought)=>{
        console.log(thought.id)
        res.json(thought)
        User.findOneAndUpdate(
            { _id: userId },
            { $push: {thoughts: thought.id}},
            { runValidators: true, new: true }
        ).catch((err)=>{
            console.log(err)
        })
        
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg: err})
    })
});

// put a thought by ID
router.put(`/:thoughtId`, (req, res) => {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        { $set: 
           {thoughtText: req.body.thoughtText}
        },
        { runValidators: true, new: true }
    )
        .then((updatedThought)=>{
            if (!updatedThought) {
                res.status(404).json({msg: "Thought not found!"})
            } else {
                res.json(updatedThought)
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({msg: err})
        })

});

// delete thought by id
router.delete(`/:thoughtId`, (req, res) => {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((delThought)=>{
        if (!delThought) {
            res.status(404).json({msg: "Thought does not exist!"})
        }
        // for (let i=0; i<delThought.thoughts.length; i++){
        //     Thought.findOneAnddelete({_id: delThought.thoughts[i]})
        //     console.log(delThought.thoughts[i])
        // }
        res.json(delThought)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg: err})
    })
});

// add reaction
router.post(`/:thoughtId/reactions`, (req,res)=>{
    console.log(req.body);
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$push: 
            { reactions: {
                reactionBody: req.body.reactionBody,
                username: req.body.username
                }   
            }
        },
        { runValidators: true, new: true }
    )
    .then((thought)=>{
        if(!thought) {
            res.status(404).json({msg: `Thought does not exist!`})
        }
        res.json(thought)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg: err})
    })
});

// delete reaction
router.delete(`/:thoughtId/reactions/:reactionId`, (req,res)=>{
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions: {_id: req.params.reactionId}}},
        { runValidators: true, new: true }
    )
    .then((thought)=>{
        if(!thought) {
            res.status(404).json({msg: `Thought not found!`})
        }
        res.json(thought);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg: err})
    })
})

module.exports = router;