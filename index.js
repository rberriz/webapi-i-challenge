// implement your API heree
const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

//post

server.post('/api/users', (req, res) => {
  
    if (!req.body.name || !req.body.bio){
        res.status(400).json({error: 'Missing Parameters'})
    } else {
    


    db.insert(req.body)
    .then(user => {
           res.status(201).json(req.body)
        })
    .catch(err => {
        res.status(500).json({ errorMessage: "Something broke", err })
        })
    }
    })



//get
server.get('/api/users', (req, res) => {
    db.find()
    .then( user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({error, message: 'error'})
    })
})


//get by id

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.userId
        db.findById(userId)
        .then(user => {
            if(user){
                db.findById(userId) .then( finduser => {
                    res.status(201).json(finduser)
                })
            } else {
                    res.status(404).json({error: err, message:'The user with the specified ID does not exist.'})
            }
        })
        .catch(error => {
            res.status(500).json({error, message: 'Could not retrieve user'})
        })
})


//delete

server.delete('/api/users/:id', (req, res)=>{
    const UserId = req.params.id
    db.remove(UserId)
    .then( user =>{
        if(user){
            db.remove(UserId).then(
                removeruser => {
                    res.status(201).json(removeruser)
                }
            )
        }else{
            res.status(404).json({ error: err, mesage : "The user with specified ID does no exist"})
        }
    })
    .catch(error =>{
        res.status(500).json({  message: "The user could not be removed"})
     })
})


//put
server.put('/api/users/:id', (req, res) => {

    const userId =req.params.id
    const userBody = req.body 
    db.update(userId, userBody)
    .then( user =>{
        if(user){
            db.findById(userId).then(
                userupdate=> {
                    res.status(201).json(userupdate)
                }
            )

        }else{
            res.status(400).json({ error : err, message : "not found" })
        }
    })
    .catch(error =>{
        res.status(404).json({ message: 'Not Found'})
     })

})

//server

const port = 5000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})